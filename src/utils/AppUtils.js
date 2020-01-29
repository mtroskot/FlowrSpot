import { dimensions } from 'src/styles';
const { rem } = dimensions;

/**
 * Calculates margins needed for each item in FlatList with 2 columns,
 * so that the item distance from borders and other items is equal
 * @param index The index of current element
 * @param arrayLength The length of FlatList data array
 * @returns {{marginLeftWidth: number, marginBottomWidth: number, marginRightWidth: number}}
 */
function calculateFlatListItemMargins(index, arrayLength) {
  const marginWidth = 12;
  const marginLeftWidth = index % 2 === 0 ? marginWidth * rem : (marginWidth / 2) * rem;
  const marginRightWidth =
    index === arrayLength - 1 && index % 2 === 0
      ? marginWidth * 2 * rem
      : index % 2 === 0
      ? (marginWidth / 2) * rem
      : marginWidth * rem;
  const marginBottomWidth = index === arrayLength - 1 ? marginWidth * rem : 0;
  return {
    marginLeftWidth,
    marginRightWidth,
    marginBottomWidth
  };
}

export default {
  calculateFlatListItemMargins
};
