import React from 'react';
import useSWR, { mutate } from 'swr';
import withClient from '../ClientProvider/withClient';
import Context from './Context';
import renderChildren from '../utils/renderChildren';

const PostProvider = ({
  client,
  id,
  slug,
  namespace,
  resource,
  fallback,
  failed,
  children,
  swr
}) => {
  const key = slug ? slug : id;

  client.namespace(namespace).resource(resource);

  const fetcher = slug ? client.slug : client.get;
  console.log(client.slug);
  console.log(client.get);
  const { data, error, isValidating, revalidate } = useSWR(
    key,
    key => fetcher(key),
    swr
  );

  const context = {
    post: data,
    error,
    fetchPost: revalidate,
    updatePost: () => {},
    fetching: isValidating
  };

  if (error) {
    return React.cloneElement(failed, context);
  } else if (!data) {
    return React.cloneElement(fallback, context);
  }

  return (
    <Context.Provider value={context}>
      {renderChildren(children, context)}
    </Context.Provider>
  );
};

PostProvider.defaultProps = {
  namespace: 'wp/v2',
  resource: 'posts',
  failed: <React.Fragment />,
  fallback: <React.Fragment />
};

export default withClient(PostProvider);
