import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  listItemWrapper: {
    flex: 0.5,
    borderRadius: 3 * rem,
    overflow: 'hidden',
    marginTop: 12 * rem
  }
});

export default styles;
