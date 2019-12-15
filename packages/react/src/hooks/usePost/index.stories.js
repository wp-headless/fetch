import React from 'react';
import Post from 'testing/components/Post';
import Error from 'testing/components/Error';
import { ClientProvider } from '../client';
import usePost from '.';

/**
 * Setup
 */

export default { title: 'usePost' };

const Fetcher = ({ id, params, children }) => {
  const { error, ...rest } = usePost(id, params);
  return (
    <div>
      {children({ error, ...rest })}
      <Error error={error} />
    </div>
  );
};

/**
 * Describe
 */

export const PostById = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <h1>Post</h1>
      <Fetcher id="1">
        {({ data, ...rest }) => <Post post={data} {...rest} />}
      </Fetcher>
    </ClientProvider>
  );
};
