import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';

const { rem, height } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListContentContainer: {
    flexGrow: 1
  },
  searchResultAbsolutePositionView: {
    position: 'absolute',
    alignSelf: 'center',
    width: '90%',
    height: height * 0.3,
    top: 225 * rem
  }
});

export default styles;
