import expect from 'expect';
import Client from '../../src';
import MockTransport from '../../__mocks__/MockTransport';

// setup

const transport = new MockTransport();
const endpoint = 'http://wordpress.test/wp-json';
const client = new Client({ endpoint }, transport);

const data = {
  title: 'Hello world',
  content: 'Welcome to Wordpress'
};

const METHODS = {
  get: 'get',
  create: 'post',
  update: 'patch',
  delete: 'delete'
};

// describe

describe('Client.METHODS', () => {
  Object.keys(METHODS).forEach(method => {
    const verb = METHODS[method];
    it(`"${method}" calls correct HTTP verb on transport`, () => {
      client[method]('products', { foo: 'bar' });
      expect(client.transport[verb].mock.calls.length).toBe(1);
      expect(client.transport[verb].mock.calls[0][0]).toBe(
        'http://wordpress.test/wp-json/wp/v2/products'
      );
      expect(client.transport[verb].mock.calls[0][1]).toEqual({ foo: 'bar' });
    });
  });
});
