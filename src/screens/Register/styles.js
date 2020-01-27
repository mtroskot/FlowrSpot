import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center'
  },
  contentContainer: {
    flexGrow: 1
  },
  firstNameInputView: {
    flex: 1
  },
  lastNameInputView: {
    flex: 1,
    marginLeft: 10 * rem
  },
  cancelRegistration: {
    ...fonts.style.normal,
    textAlign: 'center',
    marginTop: 25 * rem,
    marginBottom: 45 * rem,
    color: '#949EA0',
    fontSize: 16 * rem
  }
});

export default styles;
