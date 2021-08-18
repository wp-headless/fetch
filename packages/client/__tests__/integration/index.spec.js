import Client from '../../src';
import expect from 'expect';

const endpoint = 'https://wordpress.org/news/wp-json';
const client = new Client(endpoint);

describe('Fetch Integration Suite', () => {
  it('can fetch posts', () => {
    return client
      .posts()
      .get()
      .then(posts => {
        expect(typeof posts[0].title.rendered).toBe('string');
        expect(posts[0].type).toBe('post');
      });
  });

  it('can fetch taxonomies', () => {
    return client
      .taxonomies()
      .get()
      .then(taxonomies => {
        expect(taxonomies.category.slug).toBe('category');
        expect(taxonomies.category.types).toEqual(['post']);
      });
  });
});
