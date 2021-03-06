import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  flatListContentContainer: {
    borderRadius: 10 * rem,
    overflow: 'hidden'
  },
  triangle: {
    marginLeft: 25 * rem,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8 * rem,
    borderRightWidth: 8 * rem,
    borderBottomWidth: 16 * rem,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white'
  },
  messageView: {
    backgroundColor: 'white',
    padding: 20 * rem,
    borderRadius: 10 * rem
  },
  loadingView: {
    padding: 10 * rem
  },
  messageText: {
    ...fonts.ubuntu.normal.regular,
    color: 'black',
    textAlign: 'center',
    fontSize: 14 * rem
  },
  closeButton: {
    width: '100%',
    position: 'absolute',
    backgroundColor: '#e8e8e8',
    padding: 10 * rem,
    borderRadius: 10 * rem
  },
  closeText: {
    ...fonts.ubuntu.normal.regular,
    textAlign: 'center',
    fontSize: 14 * rem
  }
});

export default styles;
