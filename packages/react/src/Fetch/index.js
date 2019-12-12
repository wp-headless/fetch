import React from 'react';
import useSWR, { mutate } from 'swr';
import withClient from '../ClientProvider/withClient';
import Context from './Context';
import renderChildren from '../utils/renderChildren';

const FetchProvider = ({
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

  const { data, error, isValidating, revalidate } = useSWR(key, fetcher, swr);

  const context = {
    post: data,
    error,
    fetch: revalidate,
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

FetchProvider.defaultProps = {
  namespace: 'wp/v2',
  resource: 'posts',
  failed: <React.Fragment />,
  fallback: <React.Fragment />
};

export default withClient(FetchProvider);
