import flowerReducer from 'src/store/reducers/flowerReducer';
import * as flowerActions from 'src/store/actions/flowerActions';

const initialState = {
  favorites: []
};

describe('INITIAL_STATE', () => {
  const beforeActionState = initialState;

  it('1returns initial state', () => {
    const action = { type: 'dummy_action' };
    const expectedState = beforeActionState;
    expect(flowerReducer(beforeActionState, action)).toEqual(expectedState);
    expect(flowerReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('2returns getFavoriteFlowersSuccess state', () => {
    const favoriteFlowers = [
      { flowerId: 1, favoriteId: 1 },
      { flowerId: 2, favoriteId: 2 },
      { flowerId: 3, favoriteId: 3 }
    ];
    const getFavoriteFlowerAction = flowerActions.getFavoriteFlowersSuccess(favoriteFlowers);
    const expectedState = { ...beforeActionState, favorites: [...beforeActionState.favorites, ...favoriteFlowers] };
    expect(flowerReducer(beforeActionState, getFavoriteFlowerAction)).toEqual(expectedState);
    expect(flowerReducer(beforeActionState, getFavoriteFlowerAction)).toMatchSnapshot();
  });

  it('3returns favoriteFlowerSuccess state', () => {
    const flowerId = 1;
    const favoriteId = 1;
    const favoriteFlowerAction = flowerActions.favoriteFlowerSuccess(flowerId, favoriteId);
    const expectedState = {
      ...beforeActionState,
      favorites: [...beforeActionState.favorites, { flowerId, favoriteId }]
    };
    expect(flowerReducer(beforeActionState, favoriteFlowerAction)).toEqual(expectedState);
    expect(flowerReducer(beforeActionState, favoriteFlowerAction)).toMatchSnapshot();
  });

  it('4returns unfavoriteFlowerSuccess state', () => {
    const flowerId = 1;
    const getFavoriteFlowerAction = flowerActions.unfavoriteFlowerSuccess(flowerId);
    const expectedState = {
      ...beforeActionState,
      favorites: beforeActionState.favorites.filter(favorite => favorite.flowerId !== flowerId)
    };
    expect(flowerReducer(beforeActionState, getFavoriteFlowerAction)).toEqual(expectedState);
    expect(flowerReducer(beforeActionState, getFavoriteFlowerAction)).toMatchSnapshot();
  });
});

describe('GET_FAVORITE_FLOWERS_SUCCESS STATE', () => {
  const beforeActionState = {
    ...initialState,
    favorites: [{ flowerId: 1, favoriteId: 1 }, { flowerId: 2, favoriteId: 2 }, { flowerId: 3, favoriteId: 3 }]
  };

  it('1returns initial state', () => {
    const action = { type: 'dummy_action' };
    const expectedState = beforeActionState;
    expect(flowerReducer(beforeActionState, action)).toEqual(expectedState);
    expect(flowerReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('2returns getFavoriteFlowersSuccess state', () => {
    const favoriteFlowers = [
      { flowerId: 4, favoriteId: 4 },
      { flowerId: 5, favoriteId: 5 },
      { flowerId: 6, favoriteId: 6 }
    ];
    const getFavoriteFlowerAction = flowerActions.getFavoriteFlowersSuccess(favoriteFlowers);
    const expectedState = { ...beforeActionState, favorites: [...beforeActionState.favorites, ...favoriteFlowers] };
    expect(flowerReducer(beforeActionState, getFavoriteFlowerAction)).toEqual(expectedState);
    expect(flowerReducer(beforeActionState, getFavoriteFlowerAction)).toMatchSnapshot();
  });

  it('3returns favoriteFlowerSuccess state', () => {
    const flowerId = 7;
    const favoriteId = 7;
    const favoriteFlowerAction = flowerActions.favoriteFlowerSuccess(flowerId, favoriteId);
    const expectedState = {
      ...beforeActionState,
      favorites: [...beforeActionState.favorites, { flowerId, favoriteId }]
    };
    expect(flowerReducer(beforeActionState, favoriteFlowerAction)).toEqual(expectedState);
    expect(flowerReducer(beforeActionState, favoriteFlowerAction)).toMatchSnapshot();
  });

  it('4returns unfavoriteFlowerSuccess state', () => {
    const flowerId = 1;
    const getFavoriteFlowerAction = flowerActions.unfavoriteFlowerSuccess(flowerId);
    const expectedState = {
      ...beforeActionState,
      favorites: beforeActionState.favorites.filter(favorite => favorite.flowerId !== flowerId)
    };
    expect(flowerReducer(beforeActionState, getFavoriteFlowerAction)).toEqual(expectedState);
    expect(flowerReducer(beforeActionState, getFavoriteFlowerAction)).toMatchSnapshot();
  });
});

describe('FAVORITE_FLOWER_SUCCESS STATE', () => {
  const beforeActionState = {
    ...initialState,
    favorites: [{ flowerId: 1, favoriteId: 1 }]
  };

  it('1returns initial state', () => {
    const action = { type: 'dummy_action' };
    const expectedState = beforeActionState;
    expect(flowerReducer(beforeActionState, action)).toEqual(expectedState);
    expect(flowerReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('2returns getFavoriteFlowersSuccess state', () => {
    const favoriteFlowers = [
      { flowerId: 4, favoriteId: 4 },
      { flowerId: 5, favoriteId: 5 },
      { flowerId: 6, favoriteId: 6 }
    ];
    const getFavoriteFlowerAction = flowerActions.getFavoriteFlowersSuccess(favoriteFlowers);
    const expectedState = { ...beforeActionState, favorites: [...beforeActionState.favorites, ...favoriteFlowers] };
    expect(flowerReducer(beforeActionState, getFavoriteFlowerAction)).toEqual(expectedState);
    expect(flowerReducer(beforeActionState, getFavoriteFlowerAction)).toMatchSnapshot();
  });

  it('3returns favoriteFlowerSuccess state', () => {
    const flowerId = 7;
    const favoriteId = 7;
    const favoriteFlowerAction = flowerActions.favoriteFlowerSuccess(flowerId, favoriteId);
    const expectedState = {
      ...beforeActionState,
      favorites: [...beforeActionState.favorites, { flowerId, favoriteId }]
    };
    expect(flowerReducer(beforeActionState, favoriteFlowerAction)).toEqual(expectedState);
    expect(flowerReducer(beforeActionState, favoriteFlowerAction)).toMatchSnapshot();
  });

  it('4returns unfavoriteFlowerSuccess state', () => {
    const flowerId = 1;
    const getFavoriteFlowerAction = flowerActions.unfavoriteFlowerSuccess(flowerId);
    const expectedState = {
      ...beforeActionState,
      favorites: beforeActionState.favorites.filter(favorite => favorite.flowerId !== flowerId)
    };
    expect(flowerReducer(beforeActionState, getFavoriteFlowerAction)).toEqual(expectedState);
    expect(flowerReducer(beforeActionState, getFavoriteFlowerAction)).toMatchSnapshot();
  });
});
