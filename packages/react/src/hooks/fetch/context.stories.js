import React, { useContext } from 'react';
import Post from 'testing/components/Post';
import { ClientProvider } from '../../';
import { FetchProvider, FetchContext } from '.';

/**
 * Setup
 */

export default {
  title: 'Fetch context',
  decorators: [
    Story => (
      <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
        <Story />
      </ClientProvider>
    )
  ]
};

/**
 * Stories
 */

const Page = () => {
  const { data: page } = useContext(FetchContext);
  return (
    <div>
      <h1>Page</h1>
      <Post post={page} />
    </div>
  );
};

export const PageById = () => {
  return (
    <FetchProvider resource="pages" id={2}>
      <div>
        <Page />
      </div>
    </FetchProvider>
  );
};
