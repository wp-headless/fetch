import React, { useEffect, useState } from 'react';
import Post from 'testing/components/Post';
import { useClient } from '.';

/**
 * Setup
 */

export default {
  title: 'Client hook'
};

/**
 * Stories
 */

export const PageById = () => {
  const client = useClient('https://demo.wp-api.org/wp-json');
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
