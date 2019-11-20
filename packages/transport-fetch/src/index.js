import base64 from 'base-64';
import queryString from 'querystringify';
import FormData from 'isomorphic-form-data';
import HTTPError from './HTTPError';

export default class FetchTransport {
  constructor() {
    ['post', 'get', 'put', 'patch', 'delete'].forEach(verb => {
      this[verb] = (url, data, config) => this.request(verb, url, data, config);
    });
  }

  request(verb, url, data, config = {}) {
    const request = {
      ...config,
      method: verb.toUpperCase()
    };

    if (data) {
      if ('PUT PATCH POST'.indexOf(verb.toUpperCase()) > -1) {
        request.body = data instanceof FormData ? data : JSON.stringify(data);
      } else {
        if (data instanceof FormData) {
          throw new TypeError(
            'Unable to encode FormData for GET, DELETE requests'
          );
        }
        url = `${url}?${queryString.stringify(data)}`;
      }
    }

    request.headers = new Headers(config.headers);

    if (config && config.auth && config.auth.username && config.auth.password) {
      request.headers.set(
        'Authorization',
        'Basic ' +
          base64.encode(`${config.auth.username}:${config.auth.password}`)
      );
    }

    return fetch(url, request)
      .then(response => response.json())
      .catch(error => {
        throw new HTTPError(error);
      });
  }
}
