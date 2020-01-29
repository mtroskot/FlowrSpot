import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import homeBackground from 'src/assets/images/background/home-background.png';
import { SearchBar } from 'src/components';
import PropTypes from 'prop-types';
import styles from 'src/screens/Home/FlowerList/ListHeader/styles';

const ListHeader = ({ headerTitle, headerSubtitle, searchInput, handleInput, clearInput, placeholder }) => {
  return (
    <ImageBackground source={homeBackground} style={styles.imageContainer}>
      <Text style={styles.headerTitle}>{headerTitle}</Text>
      <Text style={styles.headerSubTitle}>{headerSubtitle}</Text>
      <View>
        <SearchBar
          searchInput={searchInput}
          handleInput={handleInput}
          clearInput={clearInput}
          placeholder={placeholder}
          viewStyle={styles.searchBarView}
        />
      </View>
    </ImageBackground>
  );
};

ListHeader.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  headerSubtitle: PropTypes.string.isRequired,
  searchInput: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired
};

export default React.memo(ListHeader);
