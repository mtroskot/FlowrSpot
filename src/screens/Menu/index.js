import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from 'src/store/actions/userActions';
import { Alert, Text, View } from 'react-native';
import { CustomButton } from 'src/components';
import NavigationService from 'src/services/navigation';
import { screenNames } from 'src/constants/navigation';
import { StringUtils } from 'src/utils';
import PropTypes from 'prop-types';
import styles from 'src/screens/Menu/styles';
import { getFullUserName } from 'src/store/selectors';
import MenuList from 'src/screens/Menu/MenuList';

const Menu = props => {
  const openMenuEntry = menuId => {
    NavigationService.navigate(menuId);
  };
  const onLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [{ text: 'Yes', onPress: props.logoutUser }, { text: 'Cancel', style: 'cancel' }],
      { cancelable: true }
    );
  };
  const { fullUserName } = props;
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {fullUserName && <Text style={styles.greetingText}>Welcome back {fullUserName}!</Text>}
        <MenuList fullUserName={fullUserName} onMenuPress={openMenuEntry} />
        {StringUtils.isEmpty(fullUserName) ? (
          <CustomButton
            text={'New Account'}
            onPress={() => NavigationService.navigate(screenNames.REGISTER)}
            tOpacityStyle={styles.menuButtonView}
            textStyle={styles.menuButtonText}
          />
        ) : (
          <CustomButton
            text={'Logout'}
            onPress={onLogout}
            tOpacityStyle={styles.menuButtonView}
            textStyle={styles.menuButtonText}
          />
        )}
      </View>
    </View>
  );
};

Menu.propTypes = {
  fullUserName: PropTypes.string,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fullUserName: getFullUserName(state)
});
const mapDispatchToProps = {
  logoutUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Menu));
