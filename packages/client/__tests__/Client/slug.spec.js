import expect from 'expect';
import Client from '../../src';
import MockTransport from '../../__mocks__/MockTransport';

// setup

const transport = new MockTransport({
  get: [
    { id: 1, title: 'post-1' },
    { id: 2, title: 'post-2' },
    { id: 3, title: 'post-3' }
  ]
});
const endpoint = 'http://wordpress.test/wp-json';
const client = new Client({ endpoint }, transport);

// describe

describe('Client.slug', () => {
  it(`slug() calls correct HTTP verb on transport`, () => {
    client.posts().slug('foo-bar');
    expect(client.transport.get.mock.calls.length).toBe(1);
  });

  it(`slug() calls correct GET with correct params`, () => {
    client.posts().slug('foo-bar');
    expect(client.transport.get.mock.calls[0][0]).toBe(
      `${endpoint}/wp/v2/posts`
    );
    expect(client.transport.get.mock.calls[0][1]).toEqual({
      per_page: 1,
      slug: 'foo-bar'
    });
  });

  it(`slug() returns first [post] item`, async () => {
    const response = await client.posts().slug('foo-bar');
    expect(response).toEqual({ id: 1, title: 'post-1' });
  });
});
