import { call, put, takeLeading } from 'redux-saga/effects';
import { loginUserSuccess } from 'src/store/actions/userActions';
import { getFavoriteFlowers } from 'src/store/actions/flowerActions';
import { startAction, stopAction, togglePopupMessage } from 'src/store/actions/uiActions';
import { userActionTypes } from 'src/constants/actionTypes';
import { ApiService, NavigationService } from 'src/services';
import { DEFAULT_ERROR, REGISTRATION_SUCCESS } from 'src/constants/messages';
import { userRequests } from 'src/services/api';
import { StringUtils } from 'src/utils';
import { loginUserSaga, registerUserSaga, watchLoginUserSaga, watchRegisterUserSaga } from 'src/store/sagas/userSaga';

describe('registerUserSaga test', () => {
  it('should successfully register user', () => {
    const action = {
      type: userActionTypes.REGISTER_USER,
      payload: { registerData: {} }
    };
    const gen = registerUserSaga(action);
    expect(gen.next().value).toEqual(put(startAction(action.type)));
    expect(gen.next().value).toEqual(
      call(ApiService.callApiAndCheckResponse, userRequests.register(action.payload.registerData))
    );
    expect(gen.next().value).toEqual(put(togglePopupMessage(REGISTRATION_SUCCESS, 'top')));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should catch error if occurs', () => {
    const action = {
      type: userActionTypes.REGISTER_USER,
      payload: { registerData: {} }
    };
    const gen = registerUserSaga(action);
    gen.next();
    const error = new Error('msg');
    expect(gen.throw(error).value).toEqual(put(togglePopupMessage(DEFAULT_ERROR, 'top')));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });
});

describe('watchRegisterUserSaga test', () => {
  const gen = watchRegisterUserSaga();
  // exactly the same as implementation
  const expected = takeLeading(userActionTypes.REGISTER_USER, registerUserSaga);
  const actual = gen.next().value;

  it('Should fire on REGISTER_USER', () => {
    expect(actual).toEqual(expected);
  });
});

describe('loginUserSaga test', () => {
  it('should successfully login user', () => {
    const action = {
      type: userActionTypes.LOGIN_USER,
      payload: { email: 'email', password: 'password' }
    };
    const gen = loginUserSaga(action);
    expect(gen.next().value).toEqual(put(startAction(action.type)));
    expect(JSON.stringify(gen.next().value)).toEqual(
      JSON.stringify(
        call(ApiService.callApiAndCheckResponse, userRequests.login(action.payload.email, action.payload.password))
      )
    );
    const authResponse = { auth_token: 'auth_token', error: null };
    expect(gen.next(authResponse).value).toEqual(call(StringUtils.isNotEmpty, authResponse.auth_token));
    expect(gen.next(true).value).toEqual(
      call(ApiService.callApiAndCheckResponse, userRequests.getUserInfo(authResponse.auth_token))
    );
    const userInfoResponse = { user: { id: 'id', first_name: 'first_name', last_name: 'last_name' } };
    const { id, first_name, last_name } = userInfoResponse.user;
    expect(gen.next(userInfoResponse).value).toEqual(
      put(loginUserSuccess(id, action.payload.email, authResponse.auth_token, first_name, last_name))
    );
    expect(gen.next().value).toEqual(put(getFavoriteFlowers()));
    expect(gen.next().value).toEqual(call(NavigationService.goBack));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should show message if login unsuccessful', () => {
    const action = {
      type: userActionTypes.LOGIN_USER,
      payload: { email: 'email', password: 'password' }
    };
    const gen = loginUserSaga(action);
    expect(gen.next().value).toEqual(put(startAction(action.type)));
    expect(JSON.stringify(gen.next().value)).toEqual(
      JSON.stringify(
        call(ApiService.callApiAndCheckResponse, userRequests.login(action.payload.email, action.payload.password))
      )
    );
    const authResponse = { auth_token: '', error: 'error' };
    expect(gen.next(authResponse).value).toEqual(call(StringUtils.isNotEmpty, authResponse.auth_token));
    expect(gen.next(false).value).toEqual(call(StringUtils.isNotEmpty, authResponse.error));
    expect(gen.next(true).value).toEqual(put(togglePopupMessage(authResponse.error, 'top')));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should catch error if occurs', () => {
    const action = {
      type: userActionTypes.LOGIN_USER,
      payload: { email: 'email', password: 'password' }
    };
    const gen = loginUserSaga(action);
    gen.next();
    const error = new Error('msg');
    expect(gen.throw(error).value).toEqual(put(togglePopupMessage(DEFAULT_ERROR, 'top')));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });
});

describe('watchLoginUserSaga test', () => {
  const gen = watchLoginUserSaga();
  // exactly the same as implementation
  const expected = takeLeading(userActionTypes.LOGIN_USER, loginUserSaga);
  const actual = gen.next().value;

  it('Should fire on LOGIN_USER', () => {
    expect(actual).toEqual(expected);
  });
});
