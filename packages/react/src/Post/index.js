import React from 'react';
import useSWR, { mutate } from 'swr';
import Context from './Context';
import renderChildren from '../utils/renderChildren';

const PostProvider = ({
  client,
  id,
  slug,
  fallback,
  failed,
  children,
  swr
}) => {
  const key = slug ? slug : id;

  const fetcher = slug ? client.posts().slug : client.posts().get;

  const { data, error, isValidating, revalidate } = useSWR(key, fetcher, swr);

  const context = {
    post: data,
    error,
    fetchPost: revalidate,
    updatePost: () => {},
    fetching: isValidating
  };

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
