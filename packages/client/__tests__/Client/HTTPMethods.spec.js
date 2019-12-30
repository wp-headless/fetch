import expect from 'expect';
import Client from '../../src';
import MockTransport from '../../__mocks__/MockTransport';

// setup

const transport = new MockTransport();
const endpoint = 'http://wordpress.test/wp-json';
const client = new Client(endpoint, transport);

const METHODS = {
  get: 'get',
  create: 'post',
  update: 'patch',
  delete: 'delete'
};

// describe

describe('Client.METHODS', () => {
  beforeEach(() => {
    transport.resetMock();
  });

  Object.keys(METHODS).forEach(method => {
    const verb = METHODS[method];

    it(`"${method}" calls transport once`, () => {
      client[method]();
      expect(transport.request.mock.calls.length).toBe(1);
    });

    it(`"${method}" uses correct verb`, () => {
      client[method]();
      expect(transport.request.mock.calls[0][1].method).toEqual(verb);
    });

    it(`"${method}" requests correct url`, () => {
      client[method]('123');
      expect(transport.request.mock.calls[0][0]).toBe(
        'http://wordpress.test/wp-json/wp/v2/posts/123'
      );
    });

    it(`"${method}" sends json params`, () => {
      client[method]('123', { foo: 'bar' });
      expect(transport.request.mock.calls[0][1].json).toEqual({ foo: 'bar' });
    });

    it(`"${method}" can send json as first argument`, () => {
      client[method]({ foo: 'bar' });
      expect(transport.request.mock.calls[0][1].json).toEqual({ foo: 'bar' });
    });
  });
});
