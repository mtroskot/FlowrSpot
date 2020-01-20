import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;
const imageSize = 50 * rem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 5 * rem
  },
  avatarView: {
    flex: 0.2,
    paddingLeft: 20 * rem
  },
  image: {
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize / 2,
    resizeMode: 'cover'
  },
  contentView: {
    justifyContent: 'center',
    flex: 0.8
  },
  mainContentText: {
    ...fonts.style.normal,
    fontSize: 16 * rem,
    color: '#000'
  },
  contentText: {
    ...fonts.style.italic,
    fontSize: 12 * rem,
    marginTop: 5 * rem,
    color: '#666666'
  }
});

export default styles;
