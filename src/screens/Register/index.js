import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from 'src/store/actions/userActions';
import { ScrollView, Text, View } from 'react-native';
import { CustomButton, FloatingLabelTextInput, Loader } from 'src/components';
import { NavigationService } from 'src/services';
import PropTypes from 'prop-types';
import loginStyles from 'src/screens/Login/styles';
import styles from 'src/screens/Register/styles';
import { checkIfLoading } from 'src/store/selectors';
import { userActionTypes } from 'src/constants/actionTypes';
import { HookUtils } from 'src/utils';
import { popupMessagePropTypes } from 'src/constants/propTypes';
import { REGISTRATION_SUCCESS } from 'src/constants/messages';

const initialFormState = {
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  password: ''
};
const Register = props => {
  const [registerForm, setRegisterForm] = useState(initialFormState);
  const textInputRef1 = useRef(null);
  const textInputRef2 = useRef(null);
  const textInputRef3 = useRef(null);
  const textInputRef4 = useRef(null);

  HookUtils.useDidUpdate(() => {
    if (props.popupMessage.message === REGISTRATION_SUCCESS) {
      setRegisterForm(initialFormState);
    }
  }, [props.popupMessage]);

  const handleInput = (value, fieldName) => {
    setRegisterForm({ ...registerForm, [fieldName]: value });
  };

  const submitForm = () => {
    props.registerUser(registerForm);
  };

  const submitButton = !props.isLoading ? (
    <CustomButton
      onPress={submitForm}
      text="Create Account"
      tOpacityStyle={loginStyles.loginButton}
      textStyle={loginStyles.loginButtonText}
    />
  ) : (
    <Loader viewStyle={loginStyles.loaderStyle} />
  );
  return (
    <ScrollView contentContainerStyle={styles.contentContainer} bounces={false}>
      <View style={loginStyles.headerView} bounces={false}>
        <Text style={loginStyles.headerText}>Create an Account</Text>
      </View>
      <View style={styles.formContainer}>
        <FloatingLabelTextInput
          customContainerStyle={styles.firstNameInputView}
          value={registerForm.firstName}
          floatingLabel={'First Name'}
          placeholderTextColor="#949EA0"
          returnKeyType={'next'}
          autoCapitalize={'words'}
          onChangeText={value => handleInput(value, 'firstName')}
          onSubmitEditing={() => textInputRef1.current.focus()}
        />
        <FloatingLabelTextInput
          textInputRef={textInputRef1}
          customContainerStyle={styles.lastNameInputView}
          value={registerForm.lastName}
          floatingLabel={'Last Name'}
          placeholderTextColor="#949EA0"
          returnKeyType={'next'}
          autoCapitalize={'words'}
          onChangeText={value => handleInput(value, 'lastName')}
          onSubmitEditing={() => textInputRef2.current.focus()}
        />
      </View>
      <FloatingLabelTextInput
        textInputRef={textInputRef2}
        value={registerForm.birthDate}
        floatingLabel={'Date of Birth'}
        placeholderTextColor="#949EA0"
        returnKeyType={'next'}
        onChangeText={value => handleInput(value, 'birthDate')}
        onSubmitEditing={() => textInputRef3.current.focus()}
      />
      <FloatingLabelTextInput
        textInputRef={textInputRef3}
        value={registerForm.email}
        floatingLabel={'Email Address'}
        placeholderTextColor="#949EA0"
        returnKeyType={'next'}
        onChangeText={value => handleInput(value, 'email')}
        onSubmitEditing={() => textInputRef4.current.focus()}
      />
      <FloatingLabelTextInput
        textInputRef={textInputRef4}
        floatingLabel={'Password'}
        value={registerForm.password}
        secureTextEntry
        placeholderTextColor="#949EA0"
        returnKeyType={'go'}
        onChangeText={value => handleInput(value, 'password')}
        onSubmitEditing={submitForm}
      />
      {submitButton}
      <Text onPress={NavigationService.goBack} style={styles.cancelRegistration}>
        I don't want to register
      </Text>
    </ScrollView>
  );
};

Register.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired,
  popupMessage: popupMessagePropTypes.isRequired
};

const mapsStateToProps = state => ({
  isLoading: checkIfLoading(state, userActionTypes.REGISTER_USER),
  popupMessage: state.ui.popupMessage
});
const mapDispatchToProps = {
  registerUser
};
export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(React.memo(Register));
