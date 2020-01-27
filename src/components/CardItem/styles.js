import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;
const circle = 30 * rem;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 200 * rem,
    justifyContent: 'space-between'
  },
  starContainer: {
    alignSelf: 'flex-end',
    height: circle,
    width: circle,
    borderRadius: circle / 2,
    margin: 16 * rem
  },
  iconStyle: {
    width: 12 * rem,
    height: 12 * rem
  },
  starSubContainer: {
    backgroundColor: 'white',
    height: circle,
    width: circle,
    borderRadius: circle / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    justifyContent: 'flex-end',
    marginBottom: 16 * rem
  },
  title: {
    ...fonts.style.normal,
    fontSize: 18 * rem,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10 * rem,
    marginBottom: 9 * rem
  },
  subTitle: {
    ...fonts.style.italic,
    fontSize: 11 * rem,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15 * rem,
    opacity: 0.7
  },
  ovalTextBackground: {
    backgroundColor: 'black',
    borderRadius: 16 * rem,
    alignSelf: 'center'
  },
  additionalInfo: {
    ...fonts.style.normal,
    color: '#fff',
    fontSize: 11 * rem,
    paddingHorizontal: 12 * rem,
    paddingVertical: 6 * rem,
    textAlign: 'center'
  }
});

export default styles;
