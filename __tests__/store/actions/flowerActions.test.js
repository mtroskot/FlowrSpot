import configureStore from 'redux-mock-store';
import * as flowerActions from 'src/store/actions/flowerActions';
import { flowerActionTypes } from 'src/constants/actionTypes';

const middlewares = [];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {};
const store = mockStore(initialState);

describe('Flower actions tests', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches getFavoriteFlowers action', () => {
    const expectedActions = [
      {
        type: flowerActionTypes.GET_FAVORITE_FLOWERS,
        payload: {}
      }
    ];
    store.dispatch(flowerActions.getFavoriteFlowers());
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches getFavoriteFlowersSuccess action', () => {
    const favoriteFlowers = [];
    const expectedActions = [
      {
        type: flowerActionTypes.GET_FAVORITE_FLOWERS_SUCCESS,
        payload: { favoriteFlowers }
      }
    ];
    store.dispatch(flowerActions.getFavoriteFlowersSuccess(favoriteFlowers));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });
  it('dispatches favoriteFlower action', () => {
    const flowerId = 'flowerId';
    const expectedActions = [
      {
        type: flowerActionTypes.FAVORITE_FLOWER,
        payload: { flowerId }
      }
    ];
    store.dispatch(flowerActions.favoriteFlower(flowerId));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });
  it('dispatches favoriteFlowerSuccess action', () => {
    const flowerId = 'flowerId';
    const favoriteId = 'favoriteId';
    const expectedActions = [
      {
        type: flowerActionTypes.FAVORITE_FLOWER_SUCCESS,
        payload: { flowerId, favoriteId }
      }
    ];
    store.dispatch(flowerActions.favoriteFlowerSuccess(flowerId, favoriteId));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });
  it('dispatches unfavoriteFlower action', () => {
    const flowerId = 'flowerId';
    const favoriteId = 'favoriteId';
    const expectedActions = [
      {
        type: flowerActionTypes.UNFAVORITE_FLOWER,
        payload: { flowerId, favoriteId }
      }
    ];
    store.dispatch(flowerActions.unfavoriteFlower(flowerId, favoriteId));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });
  it('dispatches unfavoriteFlowerSuccess action', () => {
    const flowerId = 'flowerId';
    const expectedActions = [
      {
        type: flowerActionTypes.UNFAVORITE_FLOWER_SUCCESS,
        payload: { flowerId }
      }
    ];
    store.dispatch(flowerActions.unfavoriteFlowerSuccess(flowerId));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });
});
