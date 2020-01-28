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
    ...fonts.ubuntu.normal.medium,
    fontSize: 22 * rem,
    color: '#334144',
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
    ...fonts.ubuntu.normal.medium,
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
