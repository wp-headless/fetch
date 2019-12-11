import expect from 'expect';
import { isObject } from '../../src/util';

// describe

describe('utils.isObject', () => {
  it('can test for objects', () => {
    const data = [
      [true, {}],
      [false, 1],
      [false, false],
      [false, []],
      [false, ''],
      [false, 1.2],
      [false, new Error()]
    ].forEach(d => {
      expect(d[0]).toBe(isObject(d[1]));
    });
  });
});
