import expect from 'expect';
import AxiosClient from 'axios';
import MockAdapter from 'axios-mock-adapter';
import FormData from 'isomorphic-form-data';
import AxiosTransport from '../src';

// setup

const verbs = ['get', 'post', 'put', 'patch', 'delete'];

const axios = new MockAdapter(AxiosClient);

const transport = new AxiosTransport(AxiosClient);

beforeEach(() => {
  axios.reset();
});

// describe

it('has axios instance by default', () => {
  const shouldHaveAxios = new AxiosTransport();
  expect(shouldHaveAxios.axios).not.toBe(undefined);
});

describe('request calls', () => {
  verbs.forEach(verb => {
    it(`${verb.toUpperCase()} calls axios once`, () => {
      axios.onAny().replyOnce(200);
      return transport
        .request(verb, 'https://wp.com/wp-json')
        .then(response => {
          expect(axios.history[verb].length).toEqual(1);
        });
    });
  });
});

describe('verbs', () => {
  verbs.forEach(verb => {
    it(`${verb.toUpperCase()} sends correct http verb`, () => {
      axios.onAny().replyOnce(200);
      return transport
        .request(verb, 'https://wp.com/wp-json')
        .then(response => {
          expect(axios.history[verb][0].method).toEqual(verb);
        });
    });
  });
});

describe('url', () => {
  verbs.forEach(verb => {
    it(`${verb.toUpperCase()} calls correct url`, () => {
      axios.onAny().replyOnce(200);
      return transport
        .request(verb, 'https://wp.com/wp-json')
        .then(response => {
          expect(axios.history[verb][0].url).toEqual('https://wp.com/wp-json');
        });
    });
  });
});

describe('headers', () => {
  const config = {
    headers: {
      'X-Foo': 'bar'
    }
  };
  verbs.forEach(verb => {
    it(`${verb.toUpperCase()} sends correct headers`, () => {
      axios.onAny().replyOnce(200);
      return transport
        .request(verb, 'https://wp.com/wp-json', {}, config)
        .then(response => {
          expect(axios.history[verb][0].headers['X-Foo']).toEqual('bar');
        });
    });
  });
});

describe('basic auth', () => {
  const config = {
    auth: {
      username: 'foo',
      password: 'bar'
    }
  };

  verbs.forEach(verb => {
    it(`${verb.toUpperCase()} can use basic auth`, () => {
      axios.onAny().replyOnce(200);
      return transport
        .request(verb, 'https://wp.com/wp-json', {}, config)
        .then(response => {
          expect(axios.history[verb][0].auth).toEqual(config.auth);
        });
    });
  });
});

describe('merge config', () => {
  const config = {
    timeout: 1337,
    maxContentLength: 1337
  };

  verbs.forEach(verb => {
    it(`${verb.toUpperCase()} passes custom config`, () => {
      axios.onAny().replyOnce(200);
      return transport
        .request(verb, 'https://wp.com/wp-json', {}, config)
        .then(response => {
          expect(axios.history[verb][0].timeout).toBe(1337);
          expect(axios.history[verb][0].maxContentLength).toBe(1337);
        });
    });
  });
});

describe('with data', () => {
  const data = { foo: 'bar' };

  verbs.forEach(verb => {
    it(`${verb.toUpperCase()} sends data`, () => {
      axios.onAny().replyOnce(200);
      if (['get', 'delete'].includes(verb)) {
        return transport
          .request(verb, 'https://wp.com/wp-json', data)
          .then(response => {
            expect(axios.history[verb][0].params).toEqual(data);
            expect(axios.history[verb][0].data).toBe(undefined);
          });
      } else {
        return transport
          .request(verb, 'https://wp.com/wp-json', data)
          .then(response => {
            expect(axios.history[verb][0].data).toEqual(JSON.stringify(data));
          });
      }
    });
  });
});

describe('with form data', () => {
  const formData = new FormData();
  formData.append('foo', 'bar');
  verbs.forEach(verb => {
    it(`${verb.toUpperCase()} sends form data`, () => {
      axios.onAny().replyOnce(200);
      if (['get', 'delete'].includes(verb)) {
        try {
          return transport.request(verb, 'https://wp.com/wp-json', formData);
        } catch (error) {
          expect(error instanceof TypeError).toBe(true);
          expect(error.message).toBe(
            'Unable to encode FormData for GET, DELETE requests'
          );
        }
      } else {
        return transport
          .request(verb, 'https://wp.com/wp-json', formData)
          .then(response => {
            expect(axios.history[verb][0].data instanceof FormData).toBe(true);
          });
      }
    });
  });
});

describe('without data', () => {
  verbs.forEach(verb => {
    it(`${verb.toUpperCase()} sends data`, () => {
      axios.onAny().replyOnce(200);
      if (['get', 'delete'].includes(verb)) {
        return transport
          .request(verb, 'https://wp.com/wp-json')
          .then(response => {
            expect(axios.history[verb][0].url).toBe('https://wp.com/wp-json');
            expect(axios.history[verb][0].body).toBe(undefined);
          });
      } else {
        return transport
          .request(verb, 'https://wp.com/wp-json')
          .then(response => {
            expect(axios.history[verb][0].body).toBe(undefined);
          });
      }
    });
  });
});

describe('returns json', () => {
  const mockResponse = { posts: [{ title: 'foo' }, { title: 'bar' }] };

  verbs.forEach(verb => {
    it(`${verb.toUpperCase()} returns data`, () => {
      axios.onAny().replyOnce(200, mockResponse);
      return transport
        .request(verb, 'https://wp.com/wp-json')
        .then(response => {
          expect(response).toEqual(mockResponse);
        });
    });
  });
});

describe('http exceptions', () => {
  const response = {
    status: 422,
    statusText: 'Invalid input data'
  };

  verbs.forEach(verb => {
    it(`${verb.toUpperCase()} handles http exceptions`, () => {
      axios.onAny().replyOnce(422, response);
      expect.assertions(1);
      return transport.request(verb, 'https://wp.com/wp-json').catch(error => {
        expect(error.response.data).toEqual(response);
      });
    });
  });
});
