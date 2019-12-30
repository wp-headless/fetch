import BaseClient from '@wp-headless/client';

class Client extends BaseClient {
  fetch({ method, namespace, resource, id, slug, params }) {
    if (namespace) {
      this.namespace(namespace);
    }

    if (resource) {
      this.resource(resource);
    }

    if (slug) {
      return this.slug(slug, params);
    }

    return this[method](id, params);
  }
}

export default function createClient(options, transport = undefined) {
  return new Client(options, transport);
}
