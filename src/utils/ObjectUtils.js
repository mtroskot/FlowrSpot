/**
 * Checks if object is empty
 * @returns {boolean}
 */
function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Checks if parameter is object
 * @param param
 * @returns {boolean}
 */
function isObject(param) {
  if (param === undefined) {
    return true;
  }
  return typeof param === 'object' && param !== null;
}

export default {
  isEmpty,
  isObject
};
