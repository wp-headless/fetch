import Client, { Transport } from '../../src';
import MockTransport from '../../__mocks__/MockTransport';
import expect from 'expect';

// describe

describe('Client', () => {
  it('can set endpoint property', () => {
    const client = new Client('https://wp.com/wp-json');
    expect(client.path.endpoint).toBe('https://wp.com/wp-json');
  });

  it('sets transport property', () => {
    const transport = new MockTransport();
    const client = new Client('', transport);
    expect(client.transport).toBe(transport);
  });

  it('has default transport layer', () => {
    const client = new Client();
    expect(client.transport instanceof Transport).toBe(true);
  });

  it('has default path options', () => {
    const client = new Client('https://wp.com/wp-json');
    expect(client.path).toEqual({
      endpoint: 'https://wp.com/wp-json',
      namespace: 'wp/v2',
      resource: 'posts'
    });
  });

  it('has empty global params by default', () => {
    const client = new Client();
    expect(client.globalParams).toEqual({});
  });

  it('has HTTP methods', () => {
    const client = new Client();
    expect(typeof client.get).toBe('function');
    expect(typeof client.create).toBe('function');
    expect(typeof client.update).toBe('function');
    expect(typeof client.delete).toBe('function');
  });

  it('has API Resource methods', () => {
    const client = new Client();
    [
      'categories',
      'comments',
      'media',
      'statuses',
      'pages',
      'posts',
      'settings',
      'tags',
      'taxonomies',
      'types',
      'users',
      'search'
    ].forEach(method => {
      client[method]();
      expect(client.path.resource).toBe(method);
    });
  });
});
