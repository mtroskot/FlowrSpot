import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  popupMessageView: {
    flex: 1,
    zIndex: 2,
    backgroundColor: '#4c4c4c',
    padding: 11 * rem,
    borderRadius: 20 * rem,
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center'
  },
  message: {
    color: 'white',
    textAlign: 'center'
  },
  topPosition: {
    top: 120 * rem
  },
  bottomPosition: {
    bottom: 40 * rem
  }
});

export default styles;
