import Client from '../../src';
import Transport from '../../src/Transport';
import MockTransport from '../../__mocks__/MockTransport';
import expect from 'expect';

// describe

describe('Client', () => {
  it('sets transport property', () => {
    const transport = new MockTransport();
    const client = new Client({}, transport);
    expect(client.transport).toBe(transport);
  });

  it('has default transport layer', () => {
    const client = new Client();
    expect(client.transport instanceof Transport).toBe(true);
  });

  it('has default options', () => {
    const client = new Client();
    expect(client.options).toEqual({
      auth: {
        username: '',
        password: ''
      },
      endpoint: '',
      namespace: 'wp/v2',
      config: {
        referrer: 'wp-headless',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
  });

  it('merges options', () => {
    const client = new Client({
      endpoint: 'https://wordpress.test/wp-json',
      config: {
        referrer: 'WordMess',
        foo: 'bar'
      }
    });
    expect(client.options).toEqual({
      auth: {
        username: '',
        password: ''
      },
      endpoint: 'https://wordpress.test/wp-json',
      namespace: 'wp/v2',
      config: {
        referrer: 'WordMess',
        foo: 'bar',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
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
      expect(client.path).toBe(method);
    });
  });
});
