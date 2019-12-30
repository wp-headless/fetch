import expect from 'expect';
import Client from '../../src';

// setup

const endpoint = 'http://wordpress.test/wp-json';
const client = new Client(endpoint);

// describe

describe('Client.namespace', () => {
  it('has default path namespace', () => {
    expect(client.path.namespace).toBe('wp/v2');
  });

  it('can set the current path namespace', () => {
    client.namespace('wc/v1');
    expect(client.path.namespace).toBe('wc/v1');
  });

  it('has fluent interface', () => {
    const returnValue = client.namespace('wc/v1');
    expect(returnValue).toBe(client);
  });
});
