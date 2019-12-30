import expect from 'expect';
import { isObject } from '../../src';

// describe

it('can describe non objects', () => {
  expect(isObject(true)).toBe(false);
  expect(isObject(false)).toBe(false);
  expect(isObject(null)).toBe(false);
  expect(isObject(undefined)).toBe(false);
  expect(isObject([])).toBe(false);
  expect(isObject(0)).toBe(false);
  expect(isObject(123)).toBe(false);
  expect(isObject('')).toBe(false);
  expect(isObject('foo')).toBe(false);
});

it('can describe objects', () => {
  expect(isObject({})).toBe(true);
  expect(isObject({ foo: 'bar' })).toBe(true);
  expect(isObject(new Error())).toBe(true);
});
