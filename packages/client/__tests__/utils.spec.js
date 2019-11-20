import expect from 'expect';
import { isObject, objectKeysToSnakeCase } from '../src/util';

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

describe('utils.objectKeysToSnakeCase', () => {
  it('can snake case object keys', () => {
    const data = [
      [
        {
          test_data: 1
        },
        {
          testData: 1
        }
      ],
      [
        {
          test: {
            test_data: 1
          }
        },
        {
          test: {
            testData: 1
          }
        }
      ],
      [
        {
          abc: [
            {
              abc: {
                abc_data: 1
              }
            }
          ]
        },
        {
          abc: [
            {
              abc: {
                abcData: 1
              }
            }
          ]
        }
      ]
    ].forEach(d => {
      const obj = objectKeysToSnakeCase(d[1]);
      expect(d[0]).toEqual(obj);
    });
  });
});
