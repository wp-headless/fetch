import { useQuery, useMutation, setQueryData } from 'react-query';
import { isObject } from '@wp-headless/client';
import join from 'url-join';
import { useClient } from '../client';

function makeKey(query) {
  const { namespace = '', resource = '', id = '', slug = '' } = query;
  const qs = join(namespace, resource, id.toString(), slug);
  return [qs, query];
}

export default function useFetch(query = {}, options = {}) {
  let key;

  if (!query) {
    key = false;
  } else if (typeof query === 'function') {
    key = () => makeKey(query());
  } else if (isObject(query)) {
    key = makeKey(query);
  }

  const client = useClient('https://beamaustralia.local/wp-json');

  const fetcher = query => client.query(query);

  const context = useQuery(key, fetcher, options);

  const mutator = attributes => {
    const id = attributes.ID ? attributes.ID : query.id;
    return client.update(id, attributes);
  };

  const [mutate] = useMutation(mutator);

  const update = attributes => {
    setQueryData(key, previous => ({ ...previous, ...attributes }), {
      shouldRefetch: false
    });
    return mutate(attributes, { updateQuery: key });
  };

  return { ...context, update };
}
