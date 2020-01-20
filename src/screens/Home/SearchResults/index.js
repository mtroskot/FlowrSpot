import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Loader } from 'src/components';
import SearchResultItem from 'src/screens/Home/SearchResults/SearchResultItem';
import PropTypes from 'prop-types';
import styles from 'src/screens/Home/SearchResults/styles';

function separator() {
  return <View style={styles.separator} />;
}
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
          ItemSeparatorComponent={separator}
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
        <TouchableOpacity onPress={onClosePress} style={styles.closeButton} activeOpacity={0.95}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
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
