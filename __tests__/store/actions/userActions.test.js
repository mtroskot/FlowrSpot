import configureStore from 'redux-mock-store';
import * as userActions from 'src/store/actions/userActions';
import { userActionTypes } from 'src/constants/actionTypes';

const middlewares = [];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {};
const store = mockStore(initialState);

describe('User actions tests', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches registerUser action', () => {
    const registerData = {};
    const expectedActions = [
      {
        type: userActionTypes.REGISTER_USER,
        payload: { registerData }
      }
    ];
    store.dispatch(userActions.registerUser(registerData));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches loginUser action', () => {
    const email = 'email';
    const password = 'password';
    const expectedActions = [
      {
        type: userActionTypes.LOGIN_USER,
        payload: { email, password }
      }
    ];
    store.dispatch(userActions.loginUser(email, password));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });
  it('dispatches loginUserSuccess action', () => {
    const id = 'id';
    const email = 'email';
    const authToken = 'authToken';
    const firstName = 'firstName';
    const lastName = 'lastName';
    const expectedActions = [
      {
        type: userActionTypes.LOGIN_USER_SUCCESS,
        payload: { id, email, authToken, firstName, lastName }
      }
    ];
    store.dispatch(userActions.loginUserSuccess(id, email, authToken, firstName, lastName));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });
  it('dispatches logoutUser action', () => {
    const expectedActions = [
      {
        type: userActionTypes.LOGOUT_USER,
        payload: {}
      }
    ];
    store.dispatch(userActions.logoutUser());
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });
});
