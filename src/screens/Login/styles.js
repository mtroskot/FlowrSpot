import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerView: {
    marginVertical: 45 * rem
  },
  headerText: {
    ...fonts.style.normal,
    fontSize: 22 * rem,
    textAlign: 'center'
  },
  loginButton: {
    backgroundColor: '#EAA79E',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5 * rem,
    marginTop: 60 * rem
  },
  loginButtonText: {
    ...fonts.style.normal,
    marginVertical: 17 * rem,
    fontSize: 16 * rem,
    textAlign: 'center',
    color: '#fff'
  },
  loaderStyle: {
    flex: 0,
    marginTop: 60 * rem
  }
});

export default styles;
