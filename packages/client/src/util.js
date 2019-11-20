import toSnakeCase from 'to-snake-case';

/**
 * Test if given value is a object or not.
 *
 * @param  {object} obj
 *
 * @return {bool}
 */
export const isObject = obj => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

/**
 * Convert object keys to snake case.
 *
 * @param  {object} obj
 *
 * @return {object}
 */
export const objectKeysToSnakeCase = obj => {
  return Object.keys(obj).reduce((previous, current) => {
    if (isObject(obj[current])) {
      obj[current] = objectKeysToSnakeCase(obj[current]);
    }
    if (obj[current] instanceof Array) {
      previous[toSnakeCase(current)] = obj[current].map(objectKeysToSnakeCase);
    } else {
      previous[toSnakeCase(current)] = obj[current];
    }

    return previous;
  }, {});
};
