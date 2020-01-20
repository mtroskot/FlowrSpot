import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 49 * rem
  },
  headerStyle: {
    height: 45 * rem
  },
  headerTitle: {
    height: 23 * rem,
    width: 131 * rem
  }
});

export default styles;
