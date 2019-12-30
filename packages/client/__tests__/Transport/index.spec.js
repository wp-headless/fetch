import expect from 'expect';
import fetchMock from 'fetch-mock';
import { Transport, HTTPError } from '../../src';

// setup

const transport = new Transport();

beforeEach(() => {
  fetchMock.reset();
});

// describe

it('calls fetch() once', () => {
  fetchMock.once('*', {});
  transport.request('https://wp.com/wp-json');
  expect(fetchMock.calls().length).toEqual(1);
});

it('fetches correct http verb', () => {
  ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'].forEach(
    (method, index) => {
      fetchMock.once('*', {}, { method });
      transport.request('https://wp.com/wp-json', { method });
      expect(fetchMock.calls()[index][1].method).toEqual(method);
    }
  );
});

it('uppercases http verb', () => {
  fetchMock.once('*', {}, { method: 'get' });
  transport.request('https://wp.com/wp-json', { method: 'get' });
  expect(fetchMock.calls()[0][1].method).toEqual('GET');
});

it('calls fetch() with correct input url', () => {
  const path = 'https://wp.com/wp-json/wp/v1/posts';
  fetchMock.once(path, {});
  transport.request(path);
  expect(fetchMock.calls()[0][0]).toEqual(path);
});

it(`calls fetch() with correct headers`, () => {
  const options = {
    headers: {
      'X-Foo': 'bar'
    }
  };
  fetchMock.once('*', {});
  transport.request('*', options);
  expect(fetchMock.calls()[0][1].headers).toEqual(options.headers);
});

it('passes options to fetch()', () => {
  fetchMock.once('*', {});
  transport.request('*', {
    referrer: 'bar',
    cors: 'no-cors'
  });
  expect(fetchMock.calls()[0][1]).toEqual({
    referrer: 'bar',
    cors: 'no-cors'
  });
});

it('can send json data', () => {
  const json = { foo: 'bar', puppies: [21, 33, 150], bones: ['47'] };

  ['POST', 'PUT', 'PATCH'].forEach(method => {
    fetchMock.once('*', {}, { method });
    transport.request('https://wp.com/wp-json', { method, json });
    expect(fetchMock.calls()[0][1].body).toEqual(JSON.stringify(json));
    expect(fetchMock.calls()[0][1].headers).toEqual({
      'Content-Type': 'application/json'
    });
  });
});

it('does not send json data for non-body methods', () => {
  const json = { foo: 'bar', puppies: [21, 33, 150], bones: ['47'] };

  ['DELETE', 'GET'].forEach(method => {
    fetchMock.once('*', {}, { method });
    transport.request('https://wp.com/wp-json', { method, json });
    expect(fetchMock.calls()[0][1].body).toBe(undefined);
  });
});

it('has undefined body with json data', () => {
  ['POST', 'PUT', 'PATCH'].forEach(method => {
    fetchMock.once('*', {}, { method });
    transport.request('https://wp.com/wp-json', { method, json: undefined });
    expect(fetchMock.calls()[0][1].body).toBe(undefined);
  });
});

it('has no json header without json data', () => {
  ['POST', 'PUT', 'PATCH'].forEach(method => {
    fetchMock.once('*', {}, { method });
    transport.request('https://wp.com/wp-json', { method, json: undefined });
    expect(fetchMock.calls()[0][1].headers).toEqual(undefined);
  });
});

it('url encodes queryParams', () => {
  const queryParams = { foo: 'bar', puppies: [21, 33, 150], bones: ['47'] };

  fetchMock.once('*', {});
  transport.request('https://wp.com/wp-json', { queryParams });
  expect(fetchMock.calls()[0][0]).toBe(
    'https://wp.com/wp-json?foo=bar&puppies[]=21&puppies[]=33&puppies[]=150&bones[]=47'
  );
  expect(fetchMock.calls()[0][1].body).toBe(undefined);
});

it('url encodes json data for non-body methods', () => {
  const queryParams = { foo: 'bar1' };
  const json = { foo: 'bar', puppies: [21, 33, 150], bones: ['47'] };

  ['DELETE', 'GET'].forEach(method => {
    fetchMock.once('*', {}, { method });
    transport.request('https://wp.com/wp-json', { queryParams, json, method });
    expect(fetchMock.calls()[0][0]).toBe(
      'https://wp.com/wp-json?foo=bar&puppies[]=21&puppies[]=33&puppies[]=150&bones[]=47'
    );
    expect(fetchMock.calls()[0][1].body).toBe(undefined);
  });
});

it('returns json', async () => {
  fetchMock.once('https://wp.com/wp-json', { foo: 'bar' });
  const response = await transport.request('https://wp.com/wp-json');
  expect(response).toEqual({ foo: 'bar' });
});

it('throws http exceptions', () => {
  const response = {
    status: 503,
    body: { foo: 'bar' }
  };
  fetchMock.once('*', response);
  return transport.request('https://wp.com/wp-json').catch(error => {
    expect(error instanceof HTTPError).toBe(true);
    expect(error.response).toEqual({ foo: 'bar' });
  });
});
