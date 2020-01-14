import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 49 * rem,
    justifyContent: 'flex-start'
  },
  headerStyle: {
    height: 45 * rem
  }
});

export default styles;
