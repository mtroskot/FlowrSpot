import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Home from 'src/screens/Home';
import configureMockStore from 'redux-mock-store';
import NavigationService from 'src/services/navigation';
import ApiService from 'src/services/api';
import sadFace from 'src/assets/images/emoji/sadFace.png';
import clear from 'src/assets/icons/clear/clear.png';
import { favoriteFlower, unfavoriteFlower } from 'src/store/actions/flowerActions';
import { screenNames } from 'src/constants/navigation';
import { DEFAULT_ERROR, NO_RESULTS } from 'src/constants/messages';

const mockStore = configureMockStore();
const store = mockStore({
  flower: {
    favorites: []
  },
  ui: {
    loader: {
      actions: [],
      refreshing: []
    }
  },
  user: {
    authToken: 'authToken'
  }
});

describe('Home wrapper', () => {
  const wrapper = shallow(<Home store={store} />)
    .dive()
    .dive();
  it('renders Home wrapper', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders FlatList renderItem', () => {
    const RenderItem = wrapper.find('FlatList').prop('renderItem');
    const renderItemWrapper = shallow(<RenderItem />);
    expect(renderItemWrapper).toMatchSnapshot();
  });
});

jest.mock('src/services/navigation', () => ({
  navigate: jest.fn()
}));

describe('integration', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationService.navigate.mockClear();
    store.clearActions();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calling handleInput should update searchInput state,calling clear input should clear state', done => {
    const testRenderer = TestRenderer.create(<Home store={store} />);
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(TextInput).props.value).toEqual('');
    // TYPING
    TestRenderer.act(() => {
      testInstance.findByType(TextInput).props.onChangeText('abc');
      jest.runAllTimers();
      done();
    });
    expect(testInstance.findByType(TextInput).props.value).toEqual('abc');
    // AGAIN TYPING
    TestRenderer.act(() => {
      testInstance.findByType(TextInput).props.onChangeText('123');
      jest.runAllTimers();
      done();
    });
    expect(testInstance.findByType(TextInput).props.value).toEqual('123');
    expect(testInstance.findAll(el => el.type === 'Image' && el.props.source === clear)).toHaveLength(1);
    // CLEARING INPUT
    TestRenderer.act(() => {
      testInstance.find(el => el.type === 'View' && el.props.hitSlop?.bottom === 20).props.onClick();
    });
    expect(testInstance.findByType(TextInput).props.value).toEqual('');
  });

  it(
    'calling onFavoritePress,onUnFavoritePress should dispatch store actions, ' +
      'calling onFlowerPress should navigate to flowers screen',
    () => {
      const wrapper = shallow(<Home store={store} />)
        .dive()
        .dive();
      const RenderItem = wrapper.find('FlatList').prop('renderItem');
      const renderItemWrapper = shallow(<RenderItem />);

      renderItemWrapper.find('Memo(FlowerListItem)').prop('onFavoritePress')('id');
      renderItemWrapper.find('Memo(FlowerListItem)').prop('onUnfavoritePress')('id');
      expect(store.getActions()).toEqual([favoriteFlower('id'), unfavoriteFlower('id')]);

      renderItemWrapper.find('Memo(FlowerListItem)').prop('onFlowerPress')('id');
      expect(NavigationService.navigate.mock.calls[0][0]).toEqual(screenNames.FLOWER_DETAILS);
      expect(NavigationService.navigate.mock.calls[0][1]).toEqual({ flowerId: 'id' });
    }
  );

  it('displaying loader before onDidMount fetchFlowers error, after error should display ListEmptyComponent', done => {
    ApiService.callApiAndCheckResponse = jest.fn().mockImplementation(() => {
      throw 'Error';
    });
    const testRenderer = TestRenderer.create(<Home store={store} />);
    const testInstance = testRenderer.root;
    expect(testInstance.findByType(FlatList).props.data).toEqual([]);
    expect(testInstance.findAllByType(ActivityIndicator)).toHaveLength(1);
    expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Loading flower list')).toHaveLength(1);
    TestRenderer.act(() => {
      jest.runAllTimers();
      done();
    });
    expect(testInstance.findByType(FlatList).props.data).toEqual([]);
    expect(testInstance.findAllByType(ActivityIndicator)).toHaveLength(0);
    expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Loading flower list')).toHaveLength(0);
    expect(
      testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Oops Something went wrong')
    ).toHaveLength(1);
    expect(testInstance.findAll(el => el.type === 'Image' && el.props.source === sadFace)).toHaveLength(1);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('displaying loader before onDidMount fetchFlowers success, after success should display renderedItems', done => {
    ApiService.callApiAndCheckResponse = jest.fn().mockImplementation(() => ({
      flowers: [
        {
          id: 'id',
          name: 'name',
          latin_name: 'latin_name',
          sightings: 'sightings',
          profile_picture: 'profile_picture'
        }
      ],
      meta: {
        pagination: {
          current_page: 1,
          total_pages: 3
        }
      }
    }));
    const testRenderer = TestRenderer.create(<Home store={store} />);
    const testInstance = testRenderer.root;
    TestRenderer.act(() => {
      jest.runAllTimers();
      done();
    });
    expect(testInstance.findByType(FlatList).props.data).toEqual([
      {
        id: 'id',
        name: 'name',
        latin_name: 'latin_name',
        sightings: 'sightings',
        profile_picture: 'profile_picture'
      }
    ]);
    expect(testInstance.findAllByType(ActivityIndicator)).toHaveLength(0);
    expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Loading flower list')).toHaveLength(0);
    expect(
      testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Oops Something went wrong')
    ).toHaveLength(0);
    expect(testInstance.findAll(el => el.type === 'Image' && el.props.source === sadFace)).toHaveLength(0);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('displaying loader before onDidMount fetchFlowers error, refreshing FlatList fetchFlowers success', done => {
    ApiService.callApiAndCheckResponse = jest
      .fn()
      .mockImplementation(() => ({
        flowers: [
          {
            id: 'id',
            name: 'name',
            latin_name: 'latin_name',
            sightings: 'sightings',
            profile_picture: 'profile_picture'
          }
        ],
        meta: {
          pagination: {
            current_page: 1,
            total_pages: 3
          }
        }
      }))
      .mockImplementationOnce(() => {
        throw 'Error';
      });
    const testRenderer = TestRenderer.create(<Home store={store} />);
    const testInstance = testRenderer.root;
    TestRenderer.act(() => {
      jest.runAllTimers();
      done();
    });
    // ERROR STATE
    expect(testInstance.findAllByType(ActivityIndicator)).toHaveLength(0);
    expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Loading flower list')).toHaveLength(0);
    expect(
      testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Oops Something went wrong')
    ).toHaveLength(1);
    expect(testInstance.findAll(el => el.type === 'Image' && el.props.source === sadFace)).toHaveLength(1);
    expect(testInstance.findByType(FlatList).props.data).toEqual([]);
    const flatListRefreshControl = testInstance.findByType(RefreshControl);
    TestRenderer.act(() => {
      flatListRefreshControl.props.onRefresh();
      jest.runAllTimers();
      done();
    });
    // RECOVERED STATE
    expect(testInstance.findByType(FlatList).props.data).toEqual([
      {
        id: 'id',
        name: 'name',
        latin_name: 'latin_name',
        sightings: 'sightings',
        profile_picture: 'profile_picture'
      }
    ]);
    expect(testInstance.findAllByType(ActivityIndicator)).toHaveLength(0);
    expect(
      testInstance.findAllByType(el => el.type === 'Text' && el.children[0] === 'Loading flower list')
    ).toHaveLength(0);
    expect(
      testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Oops Something went wrong')
    ).toHaveLength(0);
    expect(testInstance.findAll(el => el.type === 'Image' && el.props.source === sadFace)).toHaveLength(0);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it(
    'displaying loader before onDidMount fetchFlowers success, page 1 of 3,' +
      ' on scroll to bottom should load more flowers',
    done => {
      ApiService.callApiAndCheckResponse = jest.fn().mockImplementation(() => ({
        flowers: [
          {
            id: 'id',
            name: 'name',
            latin_name: 'latin_name',
            sightings: 'sightings',
            profile_picture: 'profile_picture'
          }
        ],
        meta: {
          pagination: {
            current_page: 1,
            total_pages: 3
          }
        }
      }));
      const testRenderer = TestRenderer.create(<Home store={store} />);
      const testInstance = testRenderer.root;
      TestRenderer.act(() => {
        jest.runAllTimers();
        done();
      });
      expect(testInstance.findByType(FlatList).props.data).toEqual([
        {
          id: 'id',
          name: 'name',
          latin_name: 'latin_name',
          sightings: 'sightings',
          profile_picture: 'profile_picture'
        }
      ]);
      expect(testInstance.findAllByType(ActivityIndicator)).toHaveLength(0);
      expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Loading flower list')).toHaveLength(
        0
      );
      expect(
        testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Oops Something went wrong')
      ).toHaveLength(0);
      expect(testInstance.findAll(el => el.type === 'Image' && el.props.source === sadFace)).toHaveLength(0);
      // SIMULATING ON_END_REACHED
      TestRenderer.act(() => {
        testInstance.findByType(FlatList).props.onEndReached({ distanceFromEnd: 10 });
      });
      expect(testInstance.findAllByType(ActivityIndicator)).toHaveLength(1);
      TestRenderer.act(() => {
        jest.runAllTimers();
        done();
      });
      // AFTER LOADING MORE FLOWERS
      expect(testInstance.findByType(FlatList).props.data).toEqual([
        {
          id: 'id',
          name: 'name',
          latin_name: 'latin_name',
          sightings: 'sightings',
          profile_picture: 'profile_picture'
        },
        {
          id: 'id',
          name: 'name',
          latin_name: 'latin_name',
          sightings: 'sightings',
          profile_picture: 'profile_picture'
        }
      ]);
      expect(testInstance.findAllByType(ActivityIndicator)).toHaveLength(0);
      expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Loading flower list')).toHaveLength(
        0
      );
      expect(
        testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Oops Something went wrong')
      ).toHaveLength(0);
      expect(testInstance.findAll(el => el.type === 'Image' && el.props.source === sadFace)).toHaveLength(0);
      expect(testRenderer.toJSON()).toMatchSnapshot();
    }
  );
  it(
    'displaying loader before onDidMount fetchFlowers success, page 3 of 3 no more results,' +
      ' on scroll to bottom should not call fetchFlowers flowers',
    done => {
      ApiService.callApiAndCheckResponse = jest.fn().mockImplementation(() => ({
        flowers: [
          {
            id: 'id',
            name: 'name',
            latin_name: 'latin_name',
            sightings: 'sightings',
            profile_picture: 'profile_picture'
          }
        ],
        meta: {
          pagination: {
            current_page: 3,
            total_pages: 3
          }
        }
      }));
      const testRenderer = TestRenderer.create(<Home store={store} />);
      const testInstance = testRenderer.root;
      TestRenderer.act(() => {
        jest.runAllTimers();
        done();
      });
      expect(testInstance.findByType(FlatList).props.data).toEqual([
        {
          id: 'id',
          name: 'name',
          latin_name: 'latin_name',
          sightings: 'sightings',
          profile_picture: 'profile_picture'
        }
      ]);
      expect(testInstance.findAllByType(ActivityIndicator)).toHaveLength(0);
      expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Loading flower list')).toHaveLength(
        0
      );
      expect(
        testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Oops Something went wrong')
      ).toHaveLength(0);
      expect(testInstance.findAll(el => el.type === 'Image' && el.props.source === sadFace)).toHaveLength(0);
      // SIMULATING ON_END_REACHED
      TestRenderer.act(() => {
        testInstance.findByType(FlatList).props.onEndReached({ distanceFromEnd: 10 });
      });
      expect(testInstance.findAllByType(ActivityIndicator)).toHaveLength(0);
      TestRenderer.act(() => {
        jest.runAllTimers();
        done();
      });
      // AFTER LOADING MORE FLOWERS
      expect(testInstance.findByType(FlatList).props.data).toEqual([
        {
          id: 'id',
          name: 'name',
          latin_name: 'latin_name',
          sightings: 'sightings',
          profile_picture: 'profile_picture'
        }
      ]);
      expect(testInstance.findAllByType(ActivityIndicator)).toHaveLength(0);
      expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Loading flower list')).toHaveLength(
        0
      );
      expect(
        testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Oops Something went wrong')
      ).toHaveLength(0);
      expect(testInstance.findAll(el => el.type === 'Image' && el.props.source === sadFace)).toHaveLength(0);
      expect(testRenderer.toJSON()).toMatchSnapshot();
    }
  );

  it('calling handleInput should trigger searchFlowers, searchFlowers error', done => {
    ApiService.callApiAndCheckResponse = jest.fn().mockImplementation(() => {
      throw 'Error';
    });
    const testRenderer = TestRenderer.create(<Home store={store} />);
    const testInstance = testRenderer.root;
    expect(testInstance.findByType(TextInput).props.value).toBe('');
    const flatListsBeforeSearch = testInstance.findAllByType(FlatList);
    expect(flatListsBeforeSearch).toHaveLength(1);
    expect(flatListsBeforeSearch[0].props.scrollEnabled).toEqual(true);
    // TYPING
    TestRenderer.act(() => {
      testInstance.findByType(TextInput).props.onChangeText('abc');
      jest.runAllTimers();
      done();
    });
    // ERROR MESSAGE SHOWN IN SEARCH_RESULTS
    const flatListsAfterSearch = testInstance.findAllByType(FlatList);
    expect(flatListsAfterSearch).toHaveLength(1);
    expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === DEFAULT_ERROR)).toHaveLength(1);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('calling handleInput should trigger searchFlowers, searchFlowers success, no results found', done => {
    ApiService.callApiAndCheckResponse = jest.fn().mockImplementation(() => ({
      flowers: []
    }));
    const testRenderer = TestRenderer.create(<Home store={store} />);
    const testInstance = testRenderer.root;
    expect(testInstance.findByType(TextInput).props.value).toBe('');
    const flatListsBeforeSearch = testInstance.findAllByType(FlatList);
    expect(flatListsBeforeSearch).toHaveLength(1);
    expect(flatListsBeforeSearch[0].props.scrollEnabled).toEqual(true);
    // TYPING
    TestRenderer.act(() => {
      testInstance.findByType(TextInput).props.onChangeText('abc');
      jest.runAllTimers();
      done();
    });
    // NO RESULTS MESSAGE SHOWN IN SEARCH_RESULTS
    const flatListsAfterSearch = testInstance.findAllByType(FlatList);
    expect(flatListsAfterSearch).toHaveLength(1);
    expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === NO_RESULTS)).toHaveLength(1);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it(
    'calling handleInput should trigger searchFlowers, searchFlowers success, search results shown,' +
      ' calling close should hide SearchResults, typing the same input again ' +
      'should show search results without calling the api ',
    done => {
      ApiService.callApiAndCheckResponse = jest.fn().mockImplementation(() => ({
        flowers: [
          {
            id: 'id',
            name: 'name',
            latin_name: 'latin_name',
            sightings: 'sightings',
            profile_picture: 'profile_picture'
          }
        ]
      }));
      const testRenderer = TestRenderer.create(<Home store={store} />);
      const testInstance = testRenderer.root;
      expect(testInstance.findByType(TextInput).props.value).toBe('');
      const flatListsBeforeSearch = testInstance.findAllByType(FlatList);
      expect(flatListsBeforeSearch).toHaveLength(1);
      expect(flatListsBeforeSearch[0].props.scrollEnabled).toEqual(true);
      // TYPING
      TestRenderer.act(() => {
        testInstance.findByType(TextInput).props.onChangeText('abc');
        jest.runAllTimers();
        done();
      });
      // SEARCH_RESULTS DISPLAYED
      const flatListsAfterSearch = testInstance.findAllByType(FlatList);
      expect(flatListsAfterSearch).toHaveLength(2);
      expect(flatListsAfterSearch[1].props.data).toEqual([
        {
          id: 'id',
          name: 'name',
          latin_name: 'latin_name',
          sightings: 'sightings',
          profile_picture: 'profile_picture'
        }
      ]);
      expect(flatListsAfterSearch[0].props.scrollEnabled).toEqual(false);
      expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Close')).toHaveLength(1);
      expect(testInstance.findByType(TextInput).props.value).toBe('abc');
      // PRESSING CLOSE BUTTON
      TestRenderer.act(() => {
        testInstance
          .find(el => el.type === 'View' && el.props.onClick && el.props.style.position === 'absolute')
          .props.onClick();
      });
      // SEARCH_RESULTS CLOSED
      const flatListsAfterSearchResultsClose = testInstance.findAllByType(FlatList);
      expect(flatListsAfterSearchResultsClose).toHaveLength(1);
      expect(flatListsAfterSearchResultsClose[0].props.scrollEnabled).toEqual(true);
      expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Close')).toHaveLength(0);
      // SAME TEXT_INPUT AS BEFORE
      TestRenderer.act(() => {
        testInstance.findByType(TextInput).props.onChangeText('abcd');
      });
      TestRenderer.act(() => {
        testInstance.findByType(TextInput).props.onChangeText('abc');
        jest.runAllTimers();
        done();
      });
      const flatListsAfterSearchResultsReopen = testInstance.findAllByType(FlatList);
      expect(flatListsAfterSearchResultsReopen).toHaveLength(2);
      expect(flatListsAfterSearchResultsReopen[1].props.data).toEqual([
        {
          id: 'id',
          name: 'name',
          latin_name: 'latin_name',
          sightings: 'sightings',
          profile_picture: 'profile_picture'
        }
      ]);
      expect(flatListsAfterSearchResultsReopen[0].props.scrollEnabled).toEqual(false);
      expect(testInstance.findAll(el => el.type === 'Text' && el.children[0] === 'Close')).toHaveLength(1);
      expect(testInstance.findByType(TextInput).props.value).toBe('abc');
      expect(testRenderer.toJSON()).toMatchSnapshot();
    }
  );
});
