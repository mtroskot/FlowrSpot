import { call, put, takeLeading } from 'redux-saga/effects';
import { loginUserSuccess } from 'src/store/actions/userActions';
import { getFavoriteFlowers } from 'src/store/actions/flowerActions';
import { startAction, stopAction, togglePopupMessage } from 'src/store/actions/uiActions';
import { userActionTypes } from 'src/constants/actionTypes';
import { ApiService, NavigationService } from 'src/services';
import { DEFAULT_ERROR, REGISTRATION_SUCCESS } from 'src/constants/messages';
import { userRequests } from 'src/services/api';
import { StringUtils } from 'src/utils';

export function* registerUserSaga({ type, payload }) {
  try {
    yield put(startAction(type));
    const { registerData } = payload;
    //in case of successful registration we get status 200 && auth_token,
    //no need to store the token as we don't know whether the same user will login,token will be store when user logs in
    yield call(ApiService.callApiAndCheckResponse, userRequests.register(registerData));
    yield put(togglePopupMessage(REGISTRATION_SUCCESS, 'top'));
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('registerUserSaga error', error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchRegisterUserSaga() {
  yield takeLeading(userActionTypes.REGISTER_USER, registerUserSaga);
}

export function* loginUserSaga({ type, payload }) {
  try {
    yield put(startAction(type));
    const { email, password } = payload;
    const authResponse = yield call(ApiService.callApiAndCheckResponse, userRequests.login(email, password));
    const { auth_token, error } = authResponse;
    if (StringUtils.isNotEmpty(auth_token)) {
      const userInfoResponse = yield call(ApiService.callApiAndCheckResponse, userRequests.getUserInfo(auth_token));
      const { id, first_name, last_name } = userInfoResponse.user;
      yield put(loginUserSuccess(id, email, auth_token, first_name, last_name));
      yield put(getFavoriteFlowers());
      yield call(NavigationService.goBack);
    } else if (StringUtils.isNotEmpty(error)) {
      yield put(togglePopupMessage(error, 'top'));
    }
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('loginUserSaga error', error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchLoginUserSaga() {
  yield takeLeading(userActionTypes.LOGIN_USER, loginUserSaga);
}
