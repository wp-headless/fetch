import expect from 'expect';
import Client from '../../src';
import FormData from 'isomorphic-form-data';
import MockTransport from '../../__mocks__/MockTransport';

// setup

const transport = new MockTransport();
const endpoint = 'http://wordpress.test/wp-json';
const client = new Client({ endpoint }, transport);

const params = {
  title: 'Hello World',
  content: 'Welcome to the Wordpress API'
};

// describe

describe('Client.request', () => {
  beforeEach(() => {
    transport.resetMocks();
  });

  it('accepts path as 2nd param', () => {
    client.request('post', 'products');
    expect(transport.post.mock.calls[0][0]).toBe(`${endpoint}/wp/v2/products`);
  });

  it('accepts params as 2nd param', () => {
    client.request('post', params);
    expect(transport.post.mock.calls[0][0]).toBe(`${endpoint}/wp/v2`);
    expect(transport.post.mock.calls[0][1]).toEqual(params);
  });

  it('handles invalid paths', () => {
    client.request('post', undefined);
    expect(transport.post.mock.calls[0][0]).toBe(`${endpoint}/wp/v2`);
    client.request('post', 123);
    expect(transport.post.mock.calls[1][0]).toBe(`${endpoint}/wp/v2/123`);
    client.request('post', null);
    expect(transport.post.mock.calls[2][0]).toBe(`${endpoint}/wp/v2`);
    client.request('post', {});
    expect(transport.post.mock.calls[3][0]).toBe(`${endpoint}/wp/v2`);
    client.request('post', 'products/variations/123');
    expect(transport.post.mock.calls[4][0]).toBe(
      `${endpoint}/wp/v2/products/variations/123`
    );
  });

  it('merges global params', () => {
    client.params = { a: '1', b: '2' };
    client.request('post', params);
    expect(transport.post.mock.calls[0][1]).toEqual({
      ...client.params,
      ...params
    });
  });

  it('resets endpoint after request', () => {
    client.endpoint('http://foo.bar/wp-json').request('post', '/products');
    client.request('post', '/products');
    expect(transport.post.mock.calls[0][0]).toBe(
      'http://foo.bar/wp-json/wp/v2/products'
    );
    expect(transport.post.mock.calls[1][0]).toBe(
      'http://wordpress.test/wp-json/wp/v2/products'
    );
  });

  it('can send a file', () => {
    const formData = new FormData();
    client.formData = formData;
    client.params = { a: '1', b: '2' };
    client.request('post', params);

    const result = transport.post.mock.calls[0][1];
    expect(result instanceof FormData).toEqual(true);
    /**
     * @todo Needs extending to check contents of FormData instance for expected values
     **/
  });

  it('merges global request config', () => {
    client.options.config = { a: '1', b: '2' };
    client.config = { a: '2', foo: 'bar' };
    client.request('post');
    expect(transport.post.mock.calls[0][2]).toEqual({
      ...client.options.config,
      ...client.config
    });
  });

  it('restores options after requesting', () => {
    client
      .endpoint('https://foo.com/wp-json')
      .namespace('foo/v3')
      .resource('foobies');
    expect(client.options.endpoint).toEqual('https://foo.com/wp-json');
    expect(client.options.namespace).toEqual('foo/v3');
    expect(client.options.resource).toEqual('foobies');
    client.request('post');
    expect(client.options.endpoint).toEqual(endpoint);
    expect(client.options.namespace).toEqual('wp/v2');
    expect(client.options.resource).toEqual('');
  });
});
