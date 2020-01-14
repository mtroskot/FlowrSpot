import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  textInputView: {
    flexDirection: 'row',
    width: '85%',
    height: 48 * rem,
    borderWidth: 1 * rem,
    alignItems: 'center',
    borderRadius: 3 * rem,
    borderColor: 'black',
    backgroundColor: 'white'
  },
  textInputStyle: {
    flex: 1,
    ...fonts.style.normal,
    fontSize: 14 * rem,
    marginLeft: 20 * rem
  },
  iconStyle: {
    tintColor: '#E9B2A9',
    marginHorizontal: 20 * rem
  },
  searchIcon: {
    width: 20 * rem,
    height: 20 * rem
  }
});

export default styles;
