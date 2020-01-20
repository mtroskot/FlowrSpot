function isEmpty(str) {
  return str === null || str === undefined || str.trim() === '';
}

function isNotEmpty(str) {
  return !isEmpty(str);
}

const StringUtils = {
  isEmpty,
  isNotEmpty
};

export default StringUtils;
