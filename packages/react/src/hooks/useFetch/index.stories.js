import React from 'react';
import PostList from 'testing/components/PostList';
import Post from 'testing/components/Post';
import Taxonomy from 'testing/components/Taxonomy';
import TaxonomyList from 'testing/components/TaxonomyList';
import Error from 'testing/components/Error';
import { ClientProvider } from '../client';
import { useFetch, useFetchBySlug } from '.';

/**
 * Setup
 */

export default { title: 'useFetch' };

const Fetcher = ({ namespace, resource, id, params, children }) => {
  const { error, ...rest } = useFetch(namespace, resource, id, params);
  return (
    <div>
      {children({ error, ...rest })}
      <Error error={error} />
    </div>
  );
};

const SlugFetcher = ({ namespace, resource, slug, params, children }) => {
  const { error, ...rest } = useFetchBySlug(namespace, resource, slug, params);
  return (
    <div>
      {children({ error, ...rest })}
      <Error error={error} />
    </div>
  );
};

/**
 * Single item stories
 */

export const PageById = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <h1>Page</h1>
      <Fetcher namespace="wp/v2" resource="pages" id="2">
        {({ data, ...rest }) => <Post post={data} {...rest} />}
      </Fetcher>
    </ClientProvider>
  );
};

export const PageBySlug = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <h1>Page by slug</h1>
      <SlugFetcher namespace="wp/v2" resource="pages" slug="sample-page">
        {({ data, ...rest }) => <Post post={data} {...rest} />}
      </SlugFetcher>
    </ClientProvider>
  );
};

export const PostById = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <h1>Post</h1>
      <Fetcher namespace="wp/v2" resource="posts" id="1">
        {({ data, ...rest }) => <Post post={data} {...rest} />}
      </Fetcher>
    </ClientProvider>
  );
};

export const PostBySlug = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <h1>Post by slug</h1>
      <SlugFetcher namespace="wp/v2" resource="posts" slug="hello-world">
        {({ data, ...rest }) => <Post post={data} {...rest} />}
      </SlugFetcher>
    </ClientProvider>
  );
};

export const TaxonomyByName = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <h1>Taxonomy</h1>
      <Fetcher namespace="wp/v2" resource="taxonomies" id="post_tag">
        {({ data, ...rest }) => <Taxonomy taxonomy={data} {...rest} />}
      </Fetcher>
    </ClientProvider>
  );
};

/**
 * Collection stories
 */

export const Pages = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <h1>Pages</h1>
      <Fetcher namespace="wp/v2" resource="pages">
        {({ data }) => <PostList posts={data} />}
      </Fetcher>
    </ClientProvider>
  );
};

export const PagesFiltered = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <h1>Pages filtered</h1>
      <Fetcher
        namespace="wp/v2"
        resource="pages"
        params={{ search: 'Occaecati deleniti molestiae' }}
      >
        {({ data }) => <PostList posts={data} />}
      </Fetcher>
    </ClientProvider>
  );
};

export const Posts = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <h1>Posts</h1>
      <Fetcher namespace="wp/v2" resource="posts">
        {({ data }) => <PostList posts={data} />}
      </Fetcher>
    </ClientProvider>
  );
};

export const Taxonomies = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <h1>Taxonomies</h1>
      <Fetcher namespace="wp/v2" resource="taxonomies">
        {({ data }) => <TaxonomyList taxonomies={data} />}
      </Fetcher>
    </ClientProvider>
  );
};

/**
 * Dependant fetching
 */

const FetchPageAndAuthor = ({ children }) => {
  const { data: page } = useFetch('wp/v2', 'pages', 2);
  const { data: author } = useFetch(() => ['wp/v2', 'users', page.author]);
  return children({ page, author });
};

export const PageAndAuthor = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <h1>Page and author</h1>
      <FetchPageAndAuthor>
        {({ page, author }) => (
          <div>
            <h2>Created by {author && author.name}</h2>
            <Post post={page} />
          </div>
        )}
      </FetchPageAndAuthor>
    </ClientProvider>
  );
};
