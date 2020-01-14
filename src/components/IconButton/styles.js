import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  leftButton: {
    marginLeft: 15 * rem
  },
  rightButton: {
    marginRight: 15 * rem
  }
});

export default styles;
