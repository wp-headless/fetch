import expect from 'expect';
import Client from '../src';
import MockTransport from '../__mocks__/MockTransport';

// setup

const transport = new MockTransport();
const endpoint = 'http://wordpress.test/wp-json';
const client = new Client({ transport, endpoint });

// describe

describe('Client.namespace', () => {
  beforeEach(() => {
    transport.resetMocks();
  });

  it('sets the current namespace', () => {
    client.namespace('wc/v1');
    expect(client.options.namespace).toBe('wc/v1');
  });

  it('has fluent interface', () => {
    const returnValue = client.namespace('wc/v1');
    expect(returnValue).toBe(client);
  });
});
