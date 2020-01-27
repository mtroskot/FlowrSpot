import { all } from 'redux-saga/effects';
import { watchLoginUserSaga, watchRegisterUserSaga } from 'src/store/sagas/userSaga';
import {
  watchFavoriteFlowerSaga,
  watchGetFavoriteFlowersSaga,
  watchUnfavoriteFlowerSagaSaga
} from 'src/store/sagas/flowerSaga';

// prettier-ignore
export default function* rootSaga() {
  yield all([
      watchLoginUserSaga(), watchRegisterUserSaga(),
      watchGetFavoriteFlowersSaga(), watchFavoriteFlowerSaga(), watchUnfavoriteFlowerSagaSaga()
  ]);
}
