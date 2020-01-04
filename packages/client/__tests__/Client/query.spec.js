import expect from 'expect';
import Client from '../../src';
import MockTransport from '../../__mocks__/MockTransport';

// setup

const endpoint = 'http://wordpress.test/wp-json';
const transport = new MockTransport();
const client = new Client(endpoint, transport);

// describe

describe('Client.query', () => {
  beforeEach(() => {
    client.namespace('wp/v2').resource('posts');
    transport.resetMock();
  });

  it('can set namespace and resource', () => {
    client.query({ namespace: 'wc/v2', resource: 'products' });
    expect(transport.request.mock.calls[0][0]).toBe(
      `${endpoint}/wc/v2/products`
    );
  });

  it('can query by slug', () => {
    client.query({ slug: 'foo-bar' });
    expect(transport.request.mock.calls[0][1].json).toEqual({
      slug: 'foo-bar',
      per_page: 1
    });
  });

  it('uses get http method', () => {
    client.query();
    expect(transport.request.mock.calls[0][1].method).toBe('get');
  });

  it('can query by numeric id', () => {
    client.query({ id: 123 });
    expect(transport.request.mock.calls[0][0]).toBe(
      `${endpoint}/wp/v2/posts/123`
    );
    expect(transport.request.mock.calls[0][1].method).toBe('get');
  });

  it('can query by string id', () => {
    client.query({ id: '123/author' });
    expect(transport.request.mock.calls[0][0]).toBe(
      `${endpoint}/wp/v2/posts/123/author`
    );
  });

  it('passes params', () => {
    client.query({ params: { search: 'foo', per_page: 5 } });
    expect(transport.request.mock.calls[0][1].json).toEqual({
      search: 'foo',
      per_page: 5
    });
  });
});
