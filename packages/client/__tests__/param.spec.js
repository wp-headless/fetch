import expect from 'expect';
import Client from '../src';
import MockTransport from '../__mocks__/MockTransport';

// setup

const transport = new MockTransport();
const endpoint = 'http://wordpress.test/wp-json';
const client = new Client({ transport, endpoint });

// describe

describe('Client.resource', () => {
  beforeEach(() => {
    transport.resetMocks();
  });

  it('can return a param', () => {
    client.params.foo = 'bar';
    expect(client.param('foo')).toBe('bar');
  });

  it('can set a param', () => {
    client.param('test', 'foo');
    expect(client.params.test).toBe('foo');
  });

  it('can set a param object', () => {
    client.param({ a: '1', b: '2' });
    expect(client.params).toEqual({
      foo: 'bar',
      test: 'foo',
      a: '1',
      b: '2'
    });
  });

  it('has fluent interface', () => {
    const returnValue = client.param({ a: '1', b: '2' });
    expect(returnValue).toBe(client);
  });
});
