import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem, height } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center'
  },
  headerTitle: {
    ...fonts.ubuntu.normal.light,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 29 * rem,
    fontSize: 26 * rem,
    marginTop: 60 * rem,
    paddingHorizontal: 64 * rem
  },
  headerSubTitle: {
    ...fonts.ubuntu.normal.light,
    color: '#fff',
    textAlign: 'center',
    marginTop: 25 * rem,
    opacity: 0.7,
    fontSize: 16 * rem,
    lineHeight: 17 * rem
  },
  searchBarView: {
    marginTop: 20 * rem,
    marginBottom: 78 * rem
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
