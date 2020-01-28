import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  leftButton: {
    marginLeft: 15 * rem
  },
  rightButton: {
    marginRight: 15 * rem
  },
  menu: {
    height: 6 * rem,
    width: 30 * rem
  },
  tabs: {
    height: 32 * rem,
    width: 32 * rem
  },
  backArrow: {
    height: 18 * rem,
    width: 10 * rem
  }
});
export default styles;
