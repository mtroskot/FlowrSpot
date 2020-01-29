import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { CustomButton, ListItemSeparator, Loader } from 'src/components';
import SearchResultItem from 'src/screens/Home/SearchResults/SearchResultItem';
import PropTypes from 'prop-types';
import styles from 'src/screens/Home/SearchResults/styles';

const SearchResults = props => {
  const { searchData, isSearching, onResultPress, onClosePress } = props;
  const { searchResults, message } = searchData;

  if (message || isSearching) {
    return (
      <>
        <View style={styles.triangle} />
        <View style={styles.messageView}>
          {isSearching ? (
            <Loader size={'large'} viewStyle={styles.loadingView} />
          ) : (
            <Text style={styles.messageText}>{message}</Text>
          )}
        </View>
      </>
    );
  }
  return (
    <>
      <View style={styles.triangle} />
      <View>
        <FlatList
          data={searchResults}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => {
            const { id, name, latin_name, profile_picture } = item;
            return <SearchResultItem {...{ id, name, latin_name, profile_picture, onResultPress }} />;
          }}
          contentContainerStyle={styles.flatListContentContainer}
          bounces={false}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View>
        <CustomButton
          onPress={onClosePress}
          tOpacityStyle={styles.closeButton}
          activeOpacity={0.95}
          text={'Close'}
          textStyle={styles.closeText}
        />
      </View>
    </>
  );
};

SearchResults.propTypes = {
  searchData: PropTypes.shape({
    searchResults: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    message: PropTypes.string.isRequired
  }).isRequired,
  isSearching: PropTypes.bool.isRequired,
  onResultPress: PropTypes.func.isRequired,
  onClosePress: PropTypes.func.isRequired
};

export default React.memo(SearchResults);
