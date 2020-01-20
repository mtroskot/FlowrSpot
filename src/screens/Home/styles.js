import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center'
  },
  headerTitle: {
    ...fonts.style.normal,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 29 * rem,
    fontSize: 26 * rem,
    marginTop: 60 * rem,
    paddingHorizontal: 64 * rem
  },
  headerSubTitle: {
    ...fonts.style.normal,
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
    height: '35%',
    top: 225 * rem
  }
});

export default styles;
