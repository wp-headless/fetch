import createFetcher from './createFetcher';

export function useFetch(namespace, resource, id, params) {
  return createFetcher('get', { namespace, resource, id, params });
}

export function useFetchBySlug(namespace, resource, slug, params) {
  return createFetcher('slug', { namespace, resource, id: slug, params });
}
