import { call, put, select, takeLeading } from '@redux-saga/core/effects';
import { startAction, stopAction, togglePopupMessage } from 'src/store/actions/uiActions';
import { ApiService } from 'src/services';
import { flowerRequests } from 'src/services/api';
import { DEFAULT_ERROR } from 'src/constants/messages';
import { flowerActionTypes } from 'src/constants/actionTypes';
import { getUserAuthToken } from 'src/store/selectors';
import {
  favoriteFlowerSuccess,
  getFavoriteFlowersSuccess,
  unfavoriteFlowerSuccess
} from 'src/store/actions/flowerActions';

export function* getFavoriteFlowersSaga() {
  try {
    const authToken = yield select(getUserAuthToken);
    const response = yield call(ApiService.callApiAndCheckResponse, flowerRequests.getFavoriteFlowers(authToken));
    const { fav_flowers, meta } = response;
    const { pagination } = meta;
    let favoriteFlowers = fav_flowers.map(favorite => ({ flowerId: favorite.flower.id, favoriteId: favorite.id }));
    for (let i = pagination.next_page; i <= pagination.total_pages; i++) {
      const response2 = yield call(ApiService.callApiAndCheckResponse, flowerRequests.getFavoriteFlowers(authToken, i));
      const { fav_flowers } = response2;
      const favoriteFlowers2 = fav_flowers.map(favorite => ({ flowerId: favorite.flower.id, favoriteId: favorite.id }));
      favoriteFlowers = [...favoriteFlowers, ...favoriteFlowers2];
    }
    yield put(getFavoriteFlowersSuccess(favoriteFlowers));
  } catch (error) {
    console.log('getFavoriteFlowersSaga error', error);
  }
}

export function* watchGetFavoriteFlowersSaga() {
  yield takeLeading(flowerActionTypes.GET_FAVORITE_FLOWERS, getFavoriteFlowersSaga);
}

export function* favoriteFlowerSaga({ type, payload }) {
  try {
    const { flowerId } = payload;
    yield put(startAction(type, { id: flowerId }));
    const authToken = yield select(getUserAuthToken);
    const response = yield call(ApiService.callApiAndCheckResponse, flowerRequests.favoriteFlower(flowerId, authToken));
    const { fav_flower } = response;
    yield put(favoriteFlowerSuccess(flowerId, fav_flower.id));
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('favoriteFlowerSaga error', error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchFavoriteFlowerSaga() {
  yield takeLeading(flowerActionTypes.FAVORITE_FLOWER, favoriteFlowerSaga);
}

export function* unfavoriteFlowerSaga({ type, payload }) {
  try {
    const { flowerId, favoriteId } = payload;
    yield put(startAction(type, { id: flowerId }));
    const authToken = yield select(getUserAuthToken);
    yield call(ApiService.callApiAndCheckResponse, flowerRequests.unfavoriteFlower(flowerId, favoriteId, authToken));
    yield put(unfavoriteFlowerSuccess(flowerId));
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('unfavoriteFlowerSaga error', error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchUnfavoriteFlowerSagaSaga() {
  yield takeLeading(flowerActionTypes.UNFAVORITE_FLOWER, unfavoriteFlowerSaga);
}
