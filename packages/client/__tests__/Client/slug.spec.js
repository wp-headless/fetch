import expect from 'expect';
import Client from '../../src';
import MockTransport from '../../__mocks__/MockTransport';

// setup

const posts = [
  { id: 1, title: 'post-1' },
  { id: 2, title: 'post-2' },
  { id: 3, title: 'post-3' }
];

const endpoint = 'http://wordpress.test/wp-json';

// describe

describe('Client.slug', () => {
  it(`calls correct HTTP method on transport`, () => {
    const transport = new MockTransport();
    const client = new Client(endpoint, transport);
    client.posts().slug('foo-bar');
    expect(transport.request.mock.calls[0][1].method).toBe('get');
  });

  it(`calls request with correct input`, () => {
    const transport = new MockTransport();
    const client = new Client(endpoint, transport);
    client.posts().slug();
    expect(transport.request.mock.calls[0][0]).toBe(`${endpoint}/wp/v2/posts`);
  });

  it(`calls request with correct params`, () => {
    const transport = new MockTransport();
    const client = new Client(endpoint, transport);
    client.posts().slug('foo-bar', { search: 'lorem ipsum' });
    expect(transport.request.mock.calls[0][1].json).toEqual({
      search: 'lorem ipsum',
      per_page: 1,
      slug: 'foo-bar'
    });
  });

  it(`returns first [post] item`, async () => {
    const transport = new MockTransport(posts);
    const client = new Client(endpoint, transport);
    const response = await client.posts().slug('foo-bar');
    expect(response).toEqual({ id: 1, title: 'post-1' });
  });

  it(`returns undefined on 404`, async () => {
    const transport = new MockTransport([]);
    const client = new Client(endpoint, transport);
    const response = await client.posts().slug('foo-bar');
    expect(response).toBe(undefined);
  });
});
