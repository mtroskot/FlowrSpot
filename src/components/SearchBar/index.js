import React from 'react';
import { TextInput, View, ViewPropTypes } from 'react-native';
import { IconButton } from 'src/components';
import searchIcon from 'src/assets/icons/search/search.png';
import clearIcon from 'src/assets/icons/clear/clear.png';
import PropTypes from 'prop-types';
import styles from 'src/components/SearchBar/styles';
import StringUtils from 'src/utils/StringUtils';

const SearchBar = props => {
  const { searchInput, handleInput, placeholder, viewStyle, clearInput } = props;
  const searchInputEmpty = StringUtils.isEmpty(searchInput);
  return (
    <View style={[styles.textInputView, viewStyle]}>
      <TextInput
        style={styles.textInputStyle}
        value={searchInput}
        placeholder={placeholder}
        placeholderTextColor="#949EA0"
        onChangeText={handleInput}
      />
      <IconButton
        imageStyle={[styles.iconStyle, searchInputEmpty ? styles.searchIcon : styles.clearIcon]}
        icon={searchInputEmpty ? searchIcon : clearIcon}
        onPress={clearInput}
        disabled={searchInputEmpty}
      />
    </View>
  );
};

SearchBar.propTypes = {
  searchInput: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  viewStyle: ViewPropTypes.style,
  clearInput: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  placeholder: 'Search'
};

export default React.memo(SearchBar);
