import { mutate } from 'swr';
import requestToResponse from '../../utils/requestToResponse';
import { useClient } from '../client';
import { useFetch } from '../useFetch';

export default function usePost(id, params) {
  const namespace = 'wp/v2';
  const resource = 'posts';

  const client = useClient();
  const { data, update, fetch, ...rest } = useFetch(
    namespace,
    resource,
    id,
    params
  );

  const key = [namespace, resource, id, params];

  return {
    ...rest,
    post: data,
    fetch,
    update: async attributes => {
      client.namespace(namespace).resource(resource);
      await mutate(key, requestToResponse({ ...data, ...attributes }), false);
      fetch();
    }
  };
}
