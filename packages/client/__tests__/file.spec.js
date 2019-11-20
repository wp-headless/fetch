import expect from 'expect';
import fs from 'fs';
import Client from '../src';
import FormData from 'isomorphic-form-data';
import MockTransport from '../__mocks__/MockTransport';

// setup

const transport = new MockTransport();
const endpoint = 'http://wordpress.test/wp-json';
const client = new Client({ transport, endpoint });

const isFsAvailable = typeof fs.createReadStream === 'function';

const isRunningInBrowser = Boolean(process.env.BROWSER_ENV);

// test suite

function runTests(file) {
  describe('Client.file', () => {
    beforeEach(() => {
      transport.resetMocks();
    });

    it('can attach file from argument', () => {
      client.file(file, 'foo.txt');
      expect(client.formData instanceof FormData).toBe(true);
    });

    it('adds correct headers to request', () => {
      client.file(file, 'foo.txt');
      expect(client.config.headers['Content-Type']).toBe('multipart/form-data');
      expect(client.config.headers['Content-Disposition']).toMatch(/attachment; filename=foo.txt/);
    });

    it('has fluent interface', () => {
      const returnValue = client.file(file, 'foo.txt');
      expect(returnValue).toBe(client);
    });
  });
}

// run tests

if (isFsAvailable) {
  const file = fs.createReadStream(`${__dirname}/mocks/foo.txt`);
  runTests(file);
}

if (isRunningInBrowser) {
  var file = new Blob(['foo'], { type: 'text/plain' });
  runTests(file);
}
