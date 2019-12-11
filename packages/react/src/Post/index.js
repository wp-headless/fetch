import React from 'react';
import useSWR from 'swr';
import { Context } from './Context';
import renderChildren from '../renderChildren';

const PostProvider = ({ client, id, fallback, failed, children }) => {
  const { data, error } = useSWR(id, client.posts().get);

  const context = { post: data, loading: !data, error };

  let cmp = children;

  if (error) {
    cmp = failed;
  } else if (!data) {
    cmp = fallback;
  }

  return (
    <Context.Provider value={context}>
      {renderChildren(cmp, context)}
    </Context.Provider>
  );
};

export default PostProvider;
