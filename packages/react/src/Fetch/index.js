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

  const update = attributes => {
    return mutate(
      key,
      client
        .namespace(namespace)
        .resource(resource)
        .update(key, attributes)
    );
  };

  const context = {
    data,
    error,
    update,
    fetch: revalidate,
    isFetching: isValidating
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
  fallback: <React.Fragment />,
  swr: {
    refreshInterval: 30000
  }
};

export default withClient(FetchProvider);
