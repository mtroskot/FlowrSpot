import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 20 * rem,
    textAlign: 'center'
  },
  image: {
    height: 200 * rem,
    width: 200 * rem,
    backgroundColor: '#fff'
  }
});

export default styles;
