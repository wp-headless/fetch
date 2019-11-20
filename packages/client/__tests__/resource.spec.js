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

  it('sets the current path', () => {
    client.resource('products');
    expect(client.path).toBe('products');
  });

  it('has fluent interface', () => {
    const returnValue = client.resource('products');
    expect(returnValue).toBe(client);
  });
});
