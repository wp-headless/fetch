import expect from 'expect';
import Client from '../src';
import MockTransport from '../__mocks__/MockTransport';

// setup

const transport = new MockTransport();
const endpoint = 'http://wordpress.test/wp-json';
const client = new Client({ transport, endpoint });

// describe

describe('Client.header', () => {
  beforeEach(() => {
    transport.resetMocks();
  });

  it('set a single header', () => {
    client.header('X-Foo', 'bar');
    expect(client.config.headers['X-Foo']).toBe('bar');
  });

  it('can return headers', () => {
    expect(client.header('X-Foo')).toBe('bar');
  });

  it('set a headers object', () => {
    client.header({ 'X-Foo': '1', 'X-Bar': '2' });
    expect(client.config.headers).toEqual({
      'X-Foo': '1',
      'X-Bar': '2'
    });
  });

  it('has fluent interface', () => {
    const returnValue = client.header('X-Foo', 'bar');
    expect(returnValue).toBe(client);
  });
});
