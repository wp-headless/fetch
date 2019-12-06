import expect from 'expect';
import Client from '../src';
import MockTransport from '../__mocks__/MockTransport';

// setup

const transport = new MockTransport();
const endpoint = 'http://wordpress.test/wp-json';
const client = new Client({ transport, endpoint });

// describe

describe('Client.endpoint', () => {
  beforeEach(() => {
    transport.resetMocks();
  });

  it('sets the current endpoint', () => {
    client.endpoint('http://foo.test/wp-json');
    expect(client.options.endpoint).toBe('http://foo.test/wp-json');
    expect(client.initialEndpoint).toBe('http://wordpress.test/wp-json');
  });

  it('has fluent interface', () => {
    const returnValue = client.endpoint('http://foo.test/wp-json');
    expect(returnValue).toBe(client);
  });
});
