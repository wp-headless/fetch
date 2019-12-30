import { useQuery } from 'react-query';
import { useClient } from '../client';

const defaultInterval = 30000;

export default function useFetch(options = {}, config = {}) {
  let key;

  if (!options) {
    key = false;
  } else {
    const { namespace, resource, id } = options;
    key = [`${namespace}/${resource}/${id}`, options];
  }

  const client = useClient();

  const fetcher = options => {
    return client.fetch(options);
  };

  const defaultConfig = {
    refreshInterval: config.refresh ? defaultInterval : config.refreshInterval,
    ...config
  };

  const { data, error, isLoading, refetch } = useQuery(
    key,
    fetcher,
    defaultConfig
  );

  return {
    data,
    error,
    refetch,
    isFetching: isLoading,
    update: attributes => {
      client.namespace(namespace).resource(resource);
      mutate(key, client.update(id, attributes));
    },
    destroy: attributes => {
      client.namespace(namespace).resource(resource);
      mutate(key, client.delete(id, attributes));
    }
  };
}
