import { userActionTypes } from 'src/constants/actionTypes';

export const registerUser = registerData => ({
  type: userActionTypes.REGISTER_USER,
  payload: { registerData }
});

export const loginUser = (email, password) => ({
  type: userActionTypes.LOGIN_USER,
  payload: { email, password }
});

export const loginUserSuccess = (id, email, authToken, firstName, lastName) => ({
  type: userActionTypes.LOGIN_USER_SUCCESS,
  payload: { id, email, authToken, firstName, lastName }
});

export const logoutUser = () => ({
  type: userActionTypes.LOGOUT_USER,
  payload: {}
});
