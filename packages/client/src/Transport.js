import qsEncode from '@wp-headless/qs-encode';
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

    if (data && (Object.keys(data).length !== 0 || data instanceof FormData)) {
      if ('PUT PATCH POST'.indexOf(verb.toUpperCase()) > -1) {
        request.body = data instanceof FormData ? data : JSON.stringify(data);
      } else {
        if (data instanceof FormData) {
          throw new TypeError(
            'Unable to encode FormData for GET, DELETE requests'
          );
        }
        url = url + '?' + qsEncode(data);
      }
    }

    request.headers = new Headers(config.headers);

    return fetch(url, request).then(response => {
      return response.json().then(data => {
        if (!response.ok) {
          throw new HTTPError(data);
        }
        return data;
      });
    });
  }
}
