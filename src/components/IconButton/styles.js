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
    height: 5 * rem,
    width: 25 * rem
  },
  tabs: {
    height: 31 * rem,
    width: 31 * rem
  }
});

export default styles;
