import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from 'src/store/actions/userActions';
import { Text, View } from 'react-native';
import { CustomButton, FloatingLabelTextInput, KeyboardAvoidAndDismissView, Loader } from 'src/components';
import { userActionTypes } from 'src/constants/actionTypes';
import { checkIfLoading } from 'src/store/selectors';
import PropTypes from 'prop-types';
import styles from 'src/screens/Login/styles';

const Login = props => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const textInputRef = useRef(null);

  const handleInput = (value, fieldName) => {
    setLoginForm({ ...loginForm, [fieldName]: value });
  };

  const handleLogin = () => {
    props.loginUser(loginForm.email, loginForm.password);
  };

  const submitButton = !props.isLoading ? (
    <CustomButton
      onPress={handleLogin}
      text="Login to your Account"
      tOpacityStyle={styles.loginButton}
      textStyle={styles.loginButtonText}
    />
  ) : (
    <Loader viewStyle={styles.loaderStyle} />
  );

  return (
    <KeyboardAvoidAndDismissView viewStyle={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Welcome Back</Text>
      </View>
      <FloatingLabelTextInput
        value={loginForm.email}
        floatingLabel={'Email Address'}
        placeholderTextColor="#949EA0"
        returnKeyType={'next'}
        onChangeText={value => handleInput(value, 'email')}
        onSubmitEditing={() => textInputRef.current.focus()}
      />
      <FloatingLabelTextInput
        textInputRef={textInputRef}
        floatingLabel={'Password'}
        value={loginForm.password}
        secureTextEntry
        placeholderTextColor="#949EA0"
        returnKeyType={'go'}
        onChangeText={value => handleInput(value, 'password')}
        onSubmitEditing={handleLogin}
      />
      {submitButton}
    </KeyboardAvoidAndDismissView>
  );
};

Login.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: checkIfLoading(state, userActionTypes.LOGIN_USER)
});
const mapDispatchToProps = {
  loginUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Login));
