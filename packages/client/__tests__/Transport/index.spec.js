import expect from 'expect';
import FormData from 'isomorphic-form-data';
import fetchMock from 'fetch-mock';
import Transport from '../../src/Transport';
import HTTPError from '../../src/HTTPError';

// setup

const transport = new Transport();

const verbs = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

beforeEach(() => {
  fetchMock.reset();
});

// describe

describe('request calls', () => {
  verbs.forEach(verb => {
    it(`${verb} calls fetch once`, () => {
      fetchMock.once('https://wp.com/wp-json', {});
      transport
        .request(verb, 'https://wp.com/wp-json')
        .catch(error => console.log(error));
      expect(fetchMock.calls().length).toEqual(1);
    });
  });
});

describe('verbs', () => {
  verbs.forEach(verb => {
    it(`${verb} sends correct http verb`, () => {
      fetchMock.once(
        'https://wp.com/wp-json',
        {},
        {
          method: verb
        }
      );
      transport.request(verb, 'https://wp.com/wp-json');
      expect(fetchMock.calls()[0][1].method).toEqual(verb);
    });
  });
});

describe('url', () => {
  verbs.forEach(verb => {
    it(`${verb} calls correct url`, () => {
      fetchMock.once('https://wp.com/wp-json', {});
      transport.request(verb, 'https://wp.com/wp-json');
      expect(fetchMock.calls()[0][0]).toEqual('https://wp.com/wp-json');
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
    it(`${verb} sends correct headers`, () => {
      fetchMock.once('https://wp.com/wp-json', {});
      transport.request(verb, 'https://wp.com/wp-json', {}, config);
      expect(fetchMock.calls()[0][1].headers).toEqual(
        new Headers(config.headers)
      );
    });
  });
});

describe('merge config', () => {
  const config = {
    foo: 'bar',
    bar: 'foo'
  };

  verbs.forEach(verb => {
    const expected = {
      ...config,
      method: verb,
      headers: new Headers()
    };

    it(`${verb} passes custom config`, () => {
      fetchMock.once('https://wp.com/wp-json', {});
      transport.request(verb, 'https://wp.com/wp-json', {}, config);
      expect(fetchMock.calls()[0][1]).toEqual(expected);
    });
  });
});

describe('with data', () => {
  const data = { foo: 'bar', puppies: [21, 33, 150], bones: ['47'] };

  verbs.forEach(verb => {
    it(`${verb} sends data`, () => {
      if (['GET', 'DELETE'].includes(verb)) {
        fetchMock.once('*', {});
        transport.request(verb, 'https://wp.com/wp-json', data);
        expect(fetchMock.calls()[0][0]).toBe(
          'https://wp.com/wp-json?bones[]=47&foo=bar&puppies[]=21&puppies[]=33&puppies[]=150'
        );
        expect(fetchMock.calls()[0][1].body).toBe(undefined);
      } else {
        fetchMock.once('*', {});
        transport.request(verb, 'https://wp.com/wp-json', data);
        expect(fetchMock.calls()[0][1].body).toEqual(JSON.stringify(data));
      }
    });
  });
});

describe('with form data', () => {
  const formData = new FormData();
  formData.append('foo', 'bar');

  verbs.forEach(verb => {
    it(`${verb} sends form data`, () => {
      if (['GET', 'DELETE'].includes(verb)) {
        try {
          fetchMock.once('https://wp.com/wp-json', {});
          transport.request(verb, 'https://wp.com/wp-json', formData);
        } catch (error) {
          expect(error instanceof TypeError).toBe(true);
          expect(error.message).toBe(
            'Unable to encode FormData for GET, DELETE requests'
          );
        }
      } else {
        fetchMock.once('https://wp.com/wp-json', {});
        transport.request(verb, 'https://wp.com/wp-json', formData);
        expect(fetchMock.calls()[0][1].body instanceof FormData).toBe(true);
      }
    });
  });
});

describe('without data', () => {
  verbs.forEach(verb => {
    it(`${verb} sends data`, () => {
      fetchMock.once('https://wp.com/wp-json', {});
      transport.request(verb, 'https://wp.com/wp-json');
      if (['GET', 'DELETE'].includes(verb)) {
        expect(fetchMock.calls()[0][0]).toBe('https://wp.com/wp-json');
        expect(fetchMock.calls()[0][1].body).toBe(undefined);
      } else {
        expect(fetchMock.calls()[0][1].body).toBe(undefined);
      }
    });
  });
});

describe('returns json', () => {
  verbs.forEach(verb => {
    it(`${verb} returns data`, () => {
      fetchMock.once('https://wp.com/wp-json', { data: { mock: 'response' } });
      transport.request(verb, 'https://wp.com/wp-json').then(response => {
        expect(response.data).toEqual({ mock: 'response' });
      });
    });
  });
});

describe('http exceptions', () => {
  const response = {
    status: 503,
    body: { foo: 'bar' }
  };

  verbs.forEach(verb => {
    it(`${verb} throws http exceptions`, () => {
      fetchMock.once('*', response);
      return transport.request(verb, 'https://wp.com/wp-json').catch(error => {
        expect(error instanceof HTTPError).toBe(true);
        expect(error.response).toEqual({ foo: 'bar' });
      });
    });
  });
});
