import expect from 'expect';
import Client from '@wp-headless/client';
import createClient from '../createClient';

it('returns instances of Client', () => {
  expect(createClient() instanceof Client).toBe(true);
});

it('passes endpoint', () => {
  const client = createClient('https://foo.bar');
  expect(client.path.endpoint).toBe('https://foo.bar');
});

it('passes transport', () => {
  const MockTransport = { request: () => {} };
  const client = createClient('', MockTransport);
  expect(client.transport).toBe(MockTransport);
});
