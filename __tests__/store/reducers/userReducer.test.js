import userReducer from 'src/store/reducers/userReducer';
import * as userActions from 'src/store/actions/userActions';

const initialState = {
  id: null,
  email: null,
  authToken: null,
  firstName: null,
  lastName: null
};

describe('INITIAL_STATE', () => {
  const beforeActionState = initialState;

  it('1returns initial state', () => {
    const action = { type: 'dummy_action' };
    const expectedState = beforeActionState;
    expect(userReducer(beforeActionState, action)).toEqual(expectedState);
    expect(userReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('2returns loginUserSuccess state', () => {
    const id = 'id';
    const email = 'email';
    const authToken = 'authToken';
    const firstName = 'firstName';
    const lastName = 'lastName';
    const loginAction = userActions.loginUserSuccess(id, email, authToken, firstName, lastName);
    const expectedState = { ...beforeActionState, id, email, authToken, firstName, lastName };
    expect(userReducer(beforeActionState, loginAction)).toEqual(expectedState);
    expect(userReducer(beforeActionState, loginAction)).toMatchSnapshot();
  });
});

describe('LOGIN_USER_SUCCESS STATE', () => {
  const beforeActionState = {
    ...initialState,
    id: 'id',
    email: 'email',
    authToken: 'authToken',
    firstName: 'firstName',
    lastName: 'lastName'
  };

  it('1returns initial state', () => {
    const action = { type: 'dummy_action' };
    const expectedState = beforeActionState;
    expect(userReducer(beforeActionState, action)).toEqual(expectedState);
    expect(userReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('2returns loginUserSuccess state', () => {
    const id = 'id2';
    const email = 'email2';
    const authToken = 'authToken2';
    const firstName = 'firstName2';
    const lastName = 'lastName2';
    const loginAction = userActions.loginUserSuccess(id, email, authToken, firstName, lastName);
    const expectedState = { ...beforeActionState, id, email, authToken, firstName, lastName };
    expect(userReducer(beforeActionState, loginAction)).toEqual(expectedState);
    expect(userReducer(beforeActionState, loginAction)).toMatchSnapshot();
  });
});
