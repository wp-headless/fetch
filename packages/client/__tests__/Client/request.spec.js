import expect from 'expect';
import Client from '../../src';
import MockTransport from '../../__mocks__/MockTransport';

// setup

const endpoint = 'http://wordpress.test/wp-json';
const transport = new MockTransport();
const client = new Client(endpoint, transport);

// describe

describe('Client.request', () => {
  beforeEach(() => {
    client.namespace('wp/v2').resource('posts');
    transport.resetMock();
  });

  it('calls transport with correct HTTP method', () => {
    client.request('posts/123', { method: 'POST' });
    expect(transport.request.mock.calls[0][1].method).toBe('POST');
  });

  it('handles invalid paths', () => {
    client.request(undefined);
    expect(transport.request.mock.calls[0][0]).toBe(`${endpoint}/wp/v2/posts`);

    client.request(123);
    expect(transport.request.mock.calls[1][0]).toBe(
      `${endpoint}/wp/v2/posts/123`
    );

    client.request(null);
    expect(transport.request.mock.calls[2][0]).toBe(`${endpoint}/wp/v2/posts`);

    client.request('123/authors/123');
    expect(transport.request.mock.calls[3][0]).toBe(
      `${endpoint}/wp/v2/posts/123/authors/123`
    );
  });

  it('builds paths', () => {
    client
      .namespace('wc/v1')
      .resource('products')
      .request('432/variations/234');

    expect(transport.request.mock.calls[0][0]).toBe(
      `${endpoint}/wc/v1/products/432/variations/234`
    );
  });

  it('sends json', () => {
    const json = { foo: 'bar', bar: ['f', 'o', 'o'] };
    client.request('posts/123', { json });
    expect(transport.request.mock.calls[0][1].json).toEqual(json);
  });

  it('sends global url params', () => {
    client.globalParams = { foo: 'bar', bar: ['f', 'o', 'o'] };
    client.request('posts/123');
    expect(transport.request.mock.calls[0][1].queryParams).toEqual({
      foo: 'bar',
      bar: ['f', 'o', 'o']
    });
    client.globalParams = {};
  });

  it('sends url params', () => {
    const queryParams = { foo: 'bar', bar: ['f', 'o', 'o'] };
    client.request('posts/123', { queryParams });
    expect(transport.request.mock.calls[0][1].queryParams).toEqual(queryParams);
  });

  it('merges global and url params', () => {
    client.globalParams = { foo: '1', bar: ['f', 'o', 'o'] };
    const queryParams = { foo: '2' };
    client.request('posts/123', { queryParams });
    expect(transport.request.mock.calls[0][1].queryParams).toEqual({
      foo: '2',
      bar: ['f', 'o', 'o']
    });
    client.globalParams = {};
  });

  it('merges request options', () => {
    const options = {
      data: { foo: 'bar' },
      queryParams: { bar: 'foo' },
      mode: 'no-cors',
      integrity: 'BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE',
      headers: {
        'Content-Type': 'application/json',
        'X-Foo': 'bar'
      }
    };

    client.request('123', options);

    expect(transport.request.mock.calls[0][1]).toEqual({
      data: { foo: 'bar' },
      queryParams: { bar: 'foo' },
      mode: 'no-cors',
      integrity: 'BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE',
      headers: {
        'Content-Type': 'application/json',
        'X-Foo': 'bar'
      }
    });
  });
});
