import join from 'url-join';
import qsEncode from '@wp-headless/qs-encode';

export class HTTPError extends Error {
  constructor(response) {
    super(response.statusText);
    this.name = 'HTTPError';
    this.response = response;
  }
}

export function isObject(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    value instanceof Array === false
  );
}

export function merge(a, b) {
  return {
    ...(isObject(a) ? a : {}),
    ...(isObject(b) ? b : {})
  };
}

export function hasBody(method) {
  return 'POST PUT PATCH'.indexOf(method) > -1;
}

export class Transport {
  request(input, options = {}) {
    options.method = options.method ? options.method.toUpperCase() : undefined;

    if (options.json && hasBody(options.method)) {
      options.body = JSON.stringify(options.json);
      options.headers = { 'Content-Type': 'application/json' };
    }

    if (options.queryParams) {
      if (options.json && hasBody(options.method) === false) {
        options.queryParams = merge(options.queryParams, options.json);
      }
      input = input + '?' + qsEncode(options.queryParams);
    }

    return fetch(input, options).then(response => {
      return response.json().then(data => {
        if (!response.ok) {
          throw new HTTPError(data);
        }
        return data;
      });
    });
  }
}

const METHODS = {
  get: 'get',
  create: 'post',
  update: 'patch',
  delete: 'delete'
};

const RESOURCES = [
  'categories',
  'comments',
  'media',
  'statuses',
  'pages',
  'posts',
  'settings',
  'tags',
  'taxonomies',
  'types',
  'users',
  'search'
];

export default class Client {
  path = {
    namespace: 'wp/v2',
    resource: 'posts'
  };

  globalParams = {};

  constructor(endpoint = '', transport) {
    this.transport = transport ? transport : new Transport();

    this.path.endpoint = endpoint;

    RESOURCES.forEach(name => {
      this[name] = () => {
        return this.resource(name);
      };
    });

    Object.keys(METHODS).forEach(method => {
      this[method] = (path, params) => {
        if (isObject(path)) {
          params = path;
          path = '';
        }
        return this.request(path, {
          method: METHODS[method],
          json: params
        });
      };
    });
  }

  embed() {
    return this.param('_embed', 1);
  }

  namespace(namespace) {
    this.path.namespace = namespace;
    return this;
  }

  resource(resource) {
    this.path.resource = resource;
    return this;
  }

  slug = (slug, params = {}) => {
    return this.get({ ...params, per_page: 1, slug }).then(
      response => response[0]
    );
  };

  param(key, value) {
    if (typeof key === 'string') {
      this.globalParams[key] = value;
    } else {
      this.globalParams = merge(this.globalParams, key);
    }
    return this;
  }

  query({ namespace, resource, id, slug, params } = {}) {
    if (namespace) {
      this.namespace(namespace);
    }

    if (resource) {
      this.resource(resource);
    }

    if (slug) {
      return this.slug(slug, params);
    }

    return this.get(id, params);
  }

  request(path = '', options = {}) {
    const input = join(
      this.path.endpoint,
      this.path.namespace,
      this.path.resource,
      path ? path.toString() : ''
    );

    return this.transport.request(input, {
      ...options,
      queryParams: merge(this.globalParams, options.queryParams)
    });
  }
}
