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
    fontSize: 24 * rem,
    marginTop: 20 * rem,
    paddingHorizontal: 64 * rem
  },
  headerSubTitle: {
    ...fonts.style.normal,
    color: '#fff',
    textAlign: 'center',
    marginTop: 15 * rem,
    opacity: 0.7,
    fontSize: 15 * rem,
    lineHeight: 17 * rem
  },
  searchBarView: {
    marginTop: 20 * rem,
    marginBottom: 28 * rem
  },
  listItemWrapper: {
    flex: 0.5,
    borderRadius: 3 * rem,
    overflow: 'hidden',
    marginTop: 12 * rem
  }
});

export default styles;
