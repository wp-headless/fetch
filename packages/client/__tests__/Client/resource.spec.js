import expect from 'expect';
import Client from '../../src';

// setup

const endpoint = 'http://wordpress.test/wp-json';
const client = new Client(endpoint);

// describe

describe('Client.resource', () => {
  it('has default path resource', () => {
    expect(client.path.resource).toBe('posts');
  });

  it('can set the current path resource', () => {
    client.resource('pages');
    expect(client.path.resource).toBe('pages');
  });

  it('has fluent interface', () => {
    const returnValue = client.resource('taxonomies');
    expect(returnValue).toBe(client);
  });
});
