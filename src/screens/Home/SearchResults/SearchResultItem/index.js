import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from 'src/screens/Home/SearchResults/SearchResultItem/styles';

const SearchResultItem = props => {
  const { id, name, latin_name, profile_picture, onResultPress } = props;
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={() => onResultPress(id)} style={styles.container}>
      <View style={styles.avatarView}>
        <Image source={{ uri: `https:${profile_picture}` }} style={styles.image} />
      </View>
      <View style={styles.contentView}>
        <Text style={styles.mainContentText}>{name}</Text>
        <Text style={styles.contentText}>{latin_name}</Text>
      </View>
    </TouchableOpacity>
  );
};

SearchResultItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  latin_name: PropTypes.string.isRequired,
  profile_picture: PropTypes.string.isRequired,
  onResultPress: PropTypes.func.isRequired
};

export default React.memo(SearchResultItem);
