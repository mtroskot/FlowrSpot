import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;
const circle = 30;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 200 * rem,
    justifyContent: 'space-between'
  },
  starContainer: {
    alignSelf: 'flex-end',
    height: circle * rem,
    width: circle * rem,
    borderRadius: (circle / 2) * rem,
    margin: 16 * rem
  },
  starSubContainer: {
    backgroundColor: 'white',
    height: circle * rem,
    width: circle * rem,
    borderRadius: (circle / 2) * rem,
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