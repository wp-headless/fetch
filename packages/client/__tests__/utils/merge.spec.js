import expect from 'expect';
import { merge } from '../../src';

// describe

it('merges a into b', () => {
  const a = { a: '1', b: '2' };
  const b = { a: '2', b: '2', c: '3' };
  expect(merge(a, b)).toEqual({ a: '2', b: '2', c: '3' });
});

it('accepts empty params', () => {
  const a = undefined;
  const b = { a: '2', b: '2', c: '3' };
  expect(merge(a, b)).toEqual({ a: '2', b: '2', c: '3' });
  const c = { d: '1', e: '2', f: '3' };
  const d = undefined;
  expect(merge(c, d)).toEqual({ d: '1', e: '2', f: '3' });
  expect(merge(undefined, undefined)).toEqual({});
});
