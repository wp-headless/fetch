import useSWR, { mutate } from 'swr';
import { useClient } from '../client';

export default function createFetcher(method, args) {
  const { namespace, resource, id, params } = args;

  const client = useClient();

  const key = [namespace, resource, id, params];

  const fetcher = (namespace, resource, id, params) => {
    return client
      .namespace(namespace)
      .resource(resource)
      [method](id, params);
  };

  const config = { refreshInterval: 30000 };

  const { data, error, isValidating, revalidate } = useSWR(
    key,
    fetcher,
    config
  );

  return {
    data,
    error,
    isFetching: isValidating,
    fetch: revalidate,
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
