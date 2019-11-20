import Client from '../src';
import MockTransport from '../__mocks__/MockTransport';
import expect from 'expect';

// setup

const transport = new MockTransport();
const endpoint = 'http://wordpress.test/wp-json';
const client = new Client({ transport, endpoint });

// describe

describe('Client', () => {
  beforeEach(() => {
    transport.resetMocks();
  });

  it('sets transport property', () => {
    expect(client.transport).toBe(transport);
  });

  it('throws error when missing transport', () => {
    try {
      new Client({ transport: undefined });
    } catch (error) {
      expect(error instanceof TypeError).toBe(true);
      expect(error.message).toBe('Transport is required option, none was set.');
    }
  });

  it('has default options', () => {
    const ylletClient = new Client({ transport });
    expect(ylletClient.options).toEqual({
      auth: {
        username: '',
        password: ''
      },
      endpoint: '',
      namespace: 'wp/v2',
      config: {
        referrer: 'yllet',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
  });

  it('merges options', () => {
    const ylletClient = new Client({
      transport,
      endpoint: 'https://wordpress.test/wp-json',
      config: {
        referrer: 'WordMess',
        foo: 'bar'
      }
    });
    expect(ylletClient.options).toEqual({
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
    expect(typeof client.get).toBe('function');
    expect(typeof client.create).toBe('function');
    expect(typeof client.update).toBe('function');
    expect(typeof client.delete).toBe('function');
  });

  it('has API Resource methods', () => {
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
      'users'
    ].forEach(method => {
      client[method]();
      expect(client.path).toBe(method);
    });
  });
});
