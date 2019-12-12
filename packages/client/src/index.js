import FormData from 'isomorphic-form-data';
import urljoin from 'url-join';
import Transport from './Transport';
import deepMerge from 'deepmerge';

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

const isObject = value => value !== null && typeof value === 'object';

export default class Client {
  /**
   * Transport layer.
   *
   * @var {Transport}
   */
  transport = null;

  /**
   * Default client options.
   *
   * @var {object}
   */
  options = {
    endpoint: '',
    namespace: 'wp/v2',
    resource: '',
    config: {
      referrer: 'wp-headless',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  };

  /**
   * Initial endpoint.
   *
   * @var {string}
   */
  initialEndpoint = '';

  /**
   * Request params.
   *
   * @var {object}
   */
  params = {};

  /**
   * File attachment.
   *
   * @var {FormData}
   */
  formData = undefined;

  /**
   * Request config.
   *
   * @var {object}
   */
  config = {};

  /**
   * Client constructor.
   *
   * @param {object} options
   * @param {Transport} transport
   */
  constructor(options = {}, transport) {
    this.transport = !transport ? new Transport() : transport;

    this.options = deepMerge(this.options, options);

    if (this.options.nonce) {
      this.header('X-WP-Nonce', this.options.nonce);
    }

    this.initialEndpoint = this.options.endpoint;

    // Init HTTP methods
    Object.keys(METHODS).forEach(method => {
      this[method] = (path, params) => {
        return this.request(METHODS[method], path, params);
      };
    });

    // Init predefined resources methods.
    RESOURCES.forEach(name => {
      this[name] = () => {
        return this.resource(name);
      };
    });
  }

  /**
   * Returns full request url.
   *
   * @param  {string} path
   *
   * @return {string}
   */
  _getUrl(path) {
    const { endpoint, namespace, resource } = this.options;
    const safeEndpoint = endpoint.replace(namespace, '').replace(resource, '');
    return urljoin(safeEndpoint, namespace, resource, String(path || ''));
  }

  /**
   * Returns request params.
   *
   * @param  {object} params
   *
   * @return {object}
   */
  _getParams(params) {
    let merged;
    params = isObject(params) ? params : {};
    merged = deepMerge(this.params, params);

    if (this.formData instanceof FormData) {
      Object.keys(merged).forEach(key => {
        this.formData.append(key, merged[key]);
      });
      merged = this.formData;
    }

    return merged;
  }

  /**
   * Returns request config.
   *
   * @return {object}
   */
  _getConfig() {
    return deepMerge(this.options.config, this.config);
  }

  /**
   * Restores the path configuration
   *
   * @return {void}
   */
  _restore() {
    this.options = deepMerge(this.options, {
      endpoint: this.initialEndpoint,
      namespace: 'wp/v2',
      resource: ''
    });
  }

  /**
   * Enable embed mode.
   *
   * @return {Client}
   */
  embed() {
    return this.param('_embed', true);
  }

  /**
   *
   * Specify a file or a file buffer to attach to the request with a name (optional).
   *
   * @param  {string} file
   * @param  {string} name
   *
   * @return {Client}
   */
  file(file, name = '') {
    const formData = new FormData();
    formData.append('file', file);

    this.header('Content-Type', 'multipart/form-data');
    this.header('Content-Disposition', 'attachment; filename=' + name);

    this.formData = formData;

    return this;
  }

  /**
   * Set a single header or headers object.
   *
   * @param  {object|string} headers
   * @param  {string} value
   *
   * @return {Client|string}
   */
  header(key, value = null) {
    let { headers = {} } = this.config;

    if (typeof key === 'string' && !value) {
      return headers[key];
    }

    if (typeof key === 'string') {
      headers[key] = value;
    } else {
      headers = { ...headers, ...key };
    }

    this.config = { ...this.config, headers: { ...headers } }; // immutable

    return this;
  }

  /**
   * Modify endpoint that is used.
   *
   * @param  {string}  endpoint
   *
   * @return {Client}
   */
  endpoint(endpoint) {
    this.options.endpoint = endpoint;
    return this;
  }

  /**
   * Modify namespace that is used.
   *
   * @param  {string}  namespace
   *
   * @return {Client}
   */
  namespace(namespace) {
    this.options.namespace = namespace;
    return this;
  }

  /**
   * Sets the resource path.
   *
   * @param  {string} resource
   *
   * @return {Client}
   */
  resource(resource) {
    this.options.resource = resource;
    return this;
  }

  /**
   * Fetch a single item by slug
   *
   * @param  {string} postSlug
   *
   * @return {Response}
   */
  slug = slug => {
    const params = { per_page: 1, slug };
    return this.get(params).then(response => response[0]);
  };

  /**
   * Set/Get global param.
   *
   * @param  {string|object} key
   * @param  {object} value
   *
   * @return {Client|object}
   */
  param(key, value = null) {
    if (typeof key === 'string' && !value) {
      return this.params[key];
    }

    if (typeof key === 'string') {
      this.params[key] = value;
    } else {
      this.params = { ...this.params, ...key };
    }

    return this;
  }

  /**
   * Send API request
   *
   * @param  {string} path
   * @param  {object} params
   *
   * @return {Promise}
   */
  request(verb, path, params) {
    if (isObject(path)) {
      params = path;
      path = '';
    }
    const response = this.transport[verb](
      this._getUrl(path),
      this._getParams(params),
      this._getConfig()
    );

    this._restore();

    return response;
  }
}
