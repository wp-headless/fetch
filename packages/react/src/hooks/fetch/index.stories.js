import React from 'react';
import PostList from 'testing/components/PostList';
import Post from 'testing/components/Post';
import { ClientProvider } from '../../';
import { useFetch } from '.';

/**
 * Setup
 */

export default {
  title: 'Fetch hook',
  decorators: [
    Story => (
      <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
        <Story />
      </ClientProvider>
    )
  ]
};

/**
 * Single item stories
 */

export const PageById = () => {
  const { data: page } = useFetch({ resource: 'pages', id: 2 });
  return (
    <div>
      <h1>Page</h1>
      <Post post={page} />
    </div>
  );
};

export const PageBySlug = () => {
  const { data: page } = useFetch({
    resource: 'pages',
    slug: 'sample-page'
  });
  return (
    <div>
      <h1>Page</h1>
      <Post post={page} />
    </div>
  );
};

/**
 * Collection stories
 */

export const Pages = () => {
  const { data: pages } = useFetch({ resource: 'pages' });
  return (
    <div>
      <h1>Pages</h1>
      <PostList posts={pages} />
    </div>
  );
};

export const PagesFiltered = () => {
  const { data: pages } = useFetch({
    resource: 'pages',
    params: {
      search: 'Occaecati deleniti molestiae'
    }
  });
  return (
    <div>
      <h1>Pages</h1>
      <PostList posts={pages} />
    </div>
  );
};

/**
 * Dependant fetching stories
 */

export const PageAndAuthor = () => {
  const { data: page } = useFetch({ resource: 'pages', id: 2 });
  const { data: author } = useFetch(() => ({
    resource: 'users',
    id: page.author
  }));
  return (
    <div>
      <h1>Page</h1>
      <h2>Created by {author && author.name}</h2>
      <Post post={page} />
    </div>
  );
};

/**
 * Mutation stories
 */

export const UpdatePage = () => {
  const { data: page, ...rest } = useFetch({ resource: 'pages', id: 2 });
  return (
    <div>
      <h1>Page</h1>
      <Post post={page} {...rest} />
    </div>
  );
};
