import React from 'react';
import { Image, TextInput, View, ViewPropTypes } from 'react-native';
import searchIcon from 'src/assets/icons/search/search.png';
import PropTypes from 'prop-types';
import styles from 'src/components/SearchBar/styles';

const SearchBar = props => {
  const { searchInput, handleInput, placeholder, viewStyle, textInputRef } = props;
  return (
    <View style={[styles.textInputView, viewStyle]}>
      <TextInput
        ref={textInputRef}
        style={styles.textInputStyle}
        value={searchInput}
        placeholder={placeholder}
        placeholderTextColor="#949EA0"
        onChangeText={handleInput}
      />
      <Image style={[styles.iconStyle, styles.searchIcon]} source={searchIcon} />
    </View>
  );
};

SearchBar.propTypes = {
  viewStyle: ViewPropTypes.style,
  searchInput: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  textInputRef: PropTypes.shape({ current: PropTypes.instanceOf(TextInput) })
};

SearchBar.defaultProps = {
  placeholder: 'Search'
};

export default React.memo(SearchBar);
