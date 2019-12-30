import expect from 'expect';
import Client from '../../src';
import MockTransport from '../../__mocks__/MockTransport';

// setup

const transport = new MockTransport();
const endpoint = 'http://wordpress.test/wp-json';
const client = new Client(endpoint, transport);

const params = {
  title: 'Hello World',
  content: 'Welcome to the Wordpress API'
};

// describe

describe('Client.embed', () => {
  it('sends embed as url param', () => {
    client.embed().create(params);
    expect(transport.request.mock.calls[0][1].queryParams).toEqual({
      _embed: 1
    });
  });

  it('has fluent interface', () => {
    const returnValue = client.embed();
    expect(returnValue).toBe(client);
  });
});
