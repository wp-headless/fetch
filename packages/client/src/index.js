import FormData from 'isomorphic-form-data';
import urljoin from 'url-join';
import merge from 'deep-extend';
import Transport from './Transport';
import { isObject } from './util';

// HTTP methods map.
const METHODS = {
  get: 'get',
  create: 'post',
  update: 'patch',
  delete: 'delete'
};

// API resources.
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
  /**
   * Transport layer.
   *
   * @var {Transport}
   */
  transport = null;

  /**
   * Initial endpoint.
   *
   * @var {string}
   */
  initialEndpoint = null;

  /**
   * Client options.
   *
   * @var {object}
   */
  options = {
    auth: {
      username: '',
      password: ''
    },
    endpoint: '',
    namespace: 'wp/v2',
    config: {
      referrer: 'wp-headless',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  };

  /**
   * Request path.
   *
   * @var {string}
   */
  path = '';

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

    this.options = merge(this.options, options);

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
    const safePath = path ? path : '';
    const { endpoint, namespace } = this.options;
    const safeEndpoint = endpoint.replace(namespace, '');
    this.endpoint(this.initialEndpoint); // restore endpoint
    return urljoin(safeEndpoint, namespace, this.path, String(safePath));
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
    merged = { ...this.params, ...params };

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
    return merge(this.options.config, this.config);
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
   * Sets the resource request path.
   *
   * @param  {string} path
   *
   * @return {Client}
   */
  resource(path) {
    this.path = path;
    return this;
  }

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
    return this.transport[verb](
      this._getUrl(path),
      this._getParams(params),
      this._getConfig()
    );
  }
}
