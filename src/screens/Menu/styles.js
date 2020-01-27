import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  subContainer: {
    paddingLeft: 30 * rem
  },
  greetingText: {
    ...fonts.style.normal,
    color: '#000',
    fontSize: 16 * rem,
    marginTop: 53 * rem
  },
  marginTop: {
    marginTop: 30 * rem
  },
  menuTextWrapper: {
    height: 70 * rem,
    justifyContent: 'center'
  },
  menuText: {
    ...fonts.style.normal,
    color: '#949EA0',
    fontSize: 16 * rem
  },
  menuButtonView: {
    backgroundColor: '#EAA79E',
    borderRadius: 25 * rem,
    marginTop: 43 * rem,
    alignSelf: 'flex-start'
  },
  menuButtonText: {
    ...fonts.style.normal,
    color: 'white',
    fontSize: 16 * rem,
    paddingHorizontal: 27 * rem,
    paddingVertical: 12 * rem,
    textAlign: 'center'
  }
});

export default styles;
