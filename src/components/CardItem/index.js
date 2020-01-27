import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { IconButton, Loader } from 'src/components';
import PropTypes from 'prop-types';
import star from 'src/assets/icons/star/star.png';
import styles from 'src/components/CardItem/styles';

/**
 * Renders button or loading indicator.
 * @param id The id of the item
 * @param updatingItemId The id of item which is being updated
 * @param isAuthenticated If user is authenticated
 * @param isFavorite If item is marked as favorite
 * @param onIconPress Callback function for IconButton
 * @returns {IconButton|Loader3}
 */
function renderButton(id, updatingItemId, isAuthenticated, isFavorite, onIconPress) {
  if (isAuthenticated) {
    if (id === updatingItemId) {
      return <Loader color={'red'} size={'small'} />;
    } else {
      return (
        <IconButton
          icon={star}
          viewStyle={styles.starSubContainer}
          imageStyle={[styles.iconStyle, { tintColor: isFavorite ? '#ffc20d' : null }]}
          onPress={onIconPress}
        />
      );
    }
  }
  return null;
}

const CardItem = ({
  id,
  title,
  subTitle,
  additionalInfo,
  image,
  isFavorite,
  onItemPress,
  onIconPress,
  isAuthenticated,
  updatingItemId
}) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <ImageBackground source={{ uri: `https:${image}` }} style={styles.imageContainer}>
        <View style={styles.starContainer}>
          {renderButton(id, updatingItemId, isAuthenticated, isFavorite, onIconPress)}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <View style={styles.ovalTextBackground}>
            <Text style={styles.additionalInfo}>{additionalInfo} sightings</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

CardItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  additionalInfo: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  updatingItemId: PropTypes.number,
  onIconPress: PropTypes.func.isRequired,
  onItemPress: PropTypes.func.isRequired
};

export default React.memo(CardItem);
