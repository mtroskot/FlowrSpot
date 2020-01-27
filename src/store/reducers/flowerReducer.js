import { flowerActionTypes } from 'src/constants/actionTypes';

const initialState = {
  favorites: []
};

const flowerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case flowerActionTypes.GET_FAVORITE_FLOWERS_SUCCESS:
      return {
        ...state,
        favorites: [...state.favorites, ...payload.favoriteFlowers]
      };
    case flowerActionTypes.FAVORITE_FLOWER_SUCCESS:
      return {
        ...state,
        favorites: [...state.favorites, { flowerId: payload.flowerId, favoriteId: payload.favoriteId }]
      };
    case flowerActionTypes.UNFAVORITE_FLOWER_SUCCESS:
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite.flowerId !== payload.flowerId)
      };
    default:
      return state;
  }
};

export default flowerReducer;
