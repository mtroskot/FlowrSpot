import { userActionTypes } from 'src/constants/actionTypes';

const initialState = {
  id: null,
  email: null,
  authToken: null,
  firstName: null,
  lastName: null
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        id: payload.id,
        email: payload.email,
        authToken: payload.authToken,
        firstName: payload.firstName,
        lastName: payload.lastName
      };
    default:
      return state;
  }
};

export default userReducer;
