import expect from 'expect';
import { hasBody } from '../../src';

// describe

it('can describe HTTP methods that accept body', () => {
  expect(hasBody('POST')).toBe(true);
  expect(hasBody('PUT')).toBe(true);
  expect(hasBody('PATCH')).toBe(true);
});

it('can describe HTTP methods that dont accept body', () => {
  expect(hasBody('GET')).toBe(false);
  expect(hasBody('DELETE')).toBe(false);
});
