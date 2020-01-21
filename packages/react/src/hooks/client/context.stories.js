import React, { useEffect, useState } from 'react';
import Post from 'testing/components/Post';
import { ClientProvider, useClient } from '.';

/**
 * Setup
 */

export default {
  title: 'Client context'
};

/**
 * Stories
 */

const Page = () => {
  const client = useClient();
  const [page, setPage] = useState(null);
  useEffect(() => {
    client
      .pages()
      .get(2)
      .then(response => setPage(response));
  }, []);
  return (
    <div>
      <h1>Page</h1>
      <Post post={page} />
    </div>
  );
};

export const PageById = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <div>
        <Page />
      </div>
    </ClientProvider>
  );
};
