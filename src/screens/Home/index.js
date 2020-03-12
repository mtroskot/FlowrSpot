import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { favoriteFlower, unfavoriteFlower } from 'src/store/actions/flowerActions';
import { checkIfUserAuthenticated, getUpdatingItemId } from 'src/store/selectors';
import { FlatList, RefreshControl, View } from 'react-native';
import { ListEmpty, ListFooterLoader } from 'src/components';
import SearchResults from 'src/screens/Home/SearchResults';
import { FlowerListHeader, FlowerListItem } from 'src/screens/Home/FlowerList';
import { ApiService } from 'src/services';
import { flowerRequests } from 'src/services/api';
import axios from 'axios';
import { HooksUtils, StringUtils } from 'src/utils';
import { screenNames } from 'src/constants/navigation';
import NavigationService from 'src/services/navigation';
import { DEFAULT_ERROR, NO_RESULTS } from 'src/constants/messages';
import PropTypes from 'prop-types';
import { flowerActionTypes } from 'src/constants/actionTypes';
import { favoriteFlowerListPropTypes } from 'src/constants/propTypes';
import styles from 'src/screens/Home/styles';

const CancelToken = axios.CancelToken;
let source = null;
const initialPaginationState = {
  currentPage: 1,
  totalPages: null
};
const initialSearchDataState = {
  searchQuery: '',
  searchResults: [],
  message: '',
  showSearchResults: true
};

const Home = props => {
  const [yOffset, setYOffset] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [searchData, setSearchData] = useState(initialSearchDataState);
  const [searchingSearchBar, setSearchingSearchBar] = useState(false);
  const [flowerList, setFlowerList] = useState([]);
  const [flowerListPagination, setFlowerListPagination] = useState(initialPaginationState);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [flatListLoading, setFlatListLoading] = useState(false);

  HooksUtils.useDidMount(() => fetchFlowers(flowerListPagination.currentPage));

  const fetchFlowers = async (page, refreshing = false) => {
    try {
      refreshing ? setRefreshing(true) : setFlatListLoading(true);
      const response = await ApiService.callApiAndCheckResponse(flowerRequests.getFlowers(page));
      const { flowers, meta } = response;
      const { pagination } = meta;
      setFlowerListPagination({
        currentPage: pagination.current_page,
        totalPages: pagination.total_pages
      });
      refreshing ? setFlowerList(flowers) : setFlowerList([...flowerList, ...flowers]);
    } catch (error) {
      console.log('fetchFlowers error', error);
      setError(true);
    } finally {
      refreshing ? setRefreshing(false) : setFlatListLoading(false);
    }
  };

  useEffect(() => {
    source = CancelToken.source();
    let handler = null;
    if (StringUtils.isNotEmpty(searchInput) && searchInput !== searchData.searchQuery) {
      handler = setTimeout(() => {
        searchFlowers(searchInput, source.token);
      }, 500);
    } else if (StringUtils.isEmpty(searchInput)) {
      setSearchData(initialSearchDataState);
    } else if (searchInput === searchData.searchQuery && !searchData.showSearchResults) {
      setSearchData({ ...searchData, showSearchResults: true });
    }
    return () => {
      source.cancel();
      clearTimeout(handler);
    };
  }, [searchInput]);

  const searchFlowers = async (searchInput, cancelToken) => {
    try {
      setSearchData({
        ...searchData,
        showSearchResults: true
      });
      setSearchingSearchBar(true);
      const response = await ApiService.callApiAndCheckResponse(flowerRequests.searchFlowers(searchInput, cancelToken));
      const { flowers } = response;
      setSearchData({
        searchQuery: searchInput,
        searchResults: flowers,
        message: flowers.length > 0 ? '' : NO_RESULTS,
        showSearchResults: true
      });
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.log('searchFlowers error', error);
        setSearchData({
          searchQuery: searchInput,
          searchResults: [],
          message: DEFAULT_ERROR,
          showSearchResults: true
        });
      }
    } finally {
      setSearchingSearchBar(false);
    }
  };

  const handleInput = value => {
    setSearchInput(value);
  };
  const clearInput = () => {
    setSearchInput('');
  };

  const onEndReached = ({ distanceFromEnd }) => {
    if (distanceFromEnd > 0 && !flatListLoading && moreResultsAvailable) {
      const page = flowerListPagination.currentPage + 1;
      setFlowerListPagination({
        currentPage: page,
        totalPages: flowerListPagination.totalPages
      });
      fetchFlowers(flowerListPagination.currentPage + 1);
    }
  };

  const onRefresh = useCallback(() => {
    setSearchInput('');
    setFlowerListPagination(initialPaginationState);
    fetchFlowers(initialPaginationState.currentPage, true);
  }, []);

  const onFavoritePress = flowerId => {
    props.favoriteFlower(flowerId);
  };

  const onUnfavoritePress = (flowerId, favoriteId) => {
    props.unfavoriteFlower(flowerId, favoriteId);
  };

  const onFlowerPress = flowerId => {
    NavigationService.navigate(screenNames.FLOWER_DETAILS, { flowerId });
  };

  const onClosePress = () => {
    setSearchData({ ...searchData, showSearchResults: false });
  };

  function setOffset(event) {
    setYOffset(event.nativeEvent.contentOffset.y);
  }

  const moreResultsAvailable =
    flowerListPagination.currentPage < flowerListPagination.totalPages && flowerListPagination.totalPages;
  const showSearchResults =
    (searchData.searchResults.length > 0 || StringUtils.isNotEmpty(searchData.message) || searchingSearchBar) &&
    searchData.showSearchResults;
  const { isAuthenticated, updatingItemId, favoriteFlowerList } = props;
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <FlowerListHeader
            {...{
              searchInput,
              handleInput,
              clearInput,
              placeholder: 'Looking for something specific?',
              headerTitle: 'Discover flowers around you',
              headerSubtitle: 'Explore between more than 8.427 sightings'
            }}
          />
        }
        ListFooterComponent={<ListFooterLoader flatListLoading={flatListLoading} listLength={flowerList.length} />}
        ListEmptyComponent={<ListEmpty error={error} text={'Loading flower list'} />}
        data={flowerList}
        renderItem={({ item, index }) => (
          <FlowerListItem
            {...{
              item,
              index,
              arrayLength: flowerList.length,
              onFlowerPress,
              onFavoritePress,
              onUnfavoritePress,
              isAuthenticated,
              updatingItemId,
              favoriteFlowerList
            }}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        scrollEnabled={!showSearchResults}
        onEndReached={onEndReached}
        keyboardShouldPersistTaps={'handled'}
        onEndReachedThreshold={0.5}
        onMomentumScrollEnd={setOffset}
        onScrollEndDrag={setOffset}
        numColumns={2}
        contentContainerStyle={styles.flatListContentContainer}
        keyExtractor={item => item.id}
      />
      {showSearchResults && (
        <View
          style={[
            styles.searchResultAbsolutePositionView,
            { top: styles.searchResultAbsolutePositionView.top - yOffset }
          ]}>
          <SearchResults
            searchData={searchData}
            onResultPress={onFlowerPress}
            isSearching={searchingSearchBar}
            onClosePress={onClosePress}
          />
        </View>
      )}
    </View>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  updatingItemId: PropTypes.number,
  favoriteFlowerList: favoriteFlowerListPropTypes.isRequired,
  favoriteFlower: PropTypes.func.isRequired,
  unfavoriteFlower: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: checkIfUserAuthenticated(state),
  updatingItemId: getUpdatingItemId(state, flowerActionTypes.FAVORITE_FLOWER, flowerActionTypes.UNFAVORITE_FLOWER),
  favoriteFlowerList: state.flower.favorites
});
const mapDispatchToProps = {
  favoriteFlower,
  unfavoriteFlower
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Home));
