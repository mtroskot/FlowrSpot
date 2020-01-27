import { flowerActionTypes } from 'src/constants/actionTypes';

export const getFavoriteFlowers = () => ({
  type: flowerActionTypes.GET_FAVORITE_FLOWERS,
  payload: {}
});

export const getFavoriteFlowersSuccess = favoriteFlowers => ({
  type: flowerActionTypes.GET_FAVORITE_FLOWERS_SUCCESS,
  payload: { favoriteFlowers }
});

export const favoriteFlower = flowerId => ({
  type: flowerActionTypes.FAVORITE_FLOWER,
  payload: { flowerId }
});

export const favoriteFlowerSuccess = (flowerId, favoriteId) => ({
  type: flowerActionTypes.FAVORITE_FLOWER_SUCCESS,
  payload: { flowerId, favoriteId }
});

export const unfavoriteFlower = (flowerId, favoriteId) => ({
  type: flowerActionTypes.UNFAVORITE_FLOWER,
  payload: { flowerId, favoriteId }
});

export const unfavoriteFlowerSuccess = flowerId => ({
  type: flowerActionTypes.UNFAVORITE_FLOWER_SUCCESS,
  payload: { flowerId }
});
