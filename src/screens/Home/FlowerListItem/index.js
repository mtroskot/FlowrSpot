import React from 'react';
import { View } from 'react-native';
import { CardItem } from 'src/components';
import PropTypes from 'prop-types';
import styles from 'src/screens/Home/FlowerListItem/styles';
import { dimensions } from 'src/styles';
import { flowerPropTypes } from 'src/constants/propTypes';

const { rem } = dimensions;

function calculateMargins(index, arrayLength) {
  const marginWidth = 12;
  const marginLeftWidth = index % 2 === 0 ? marginWidth * rem : (marginWidth / 2) * rem;
  const marginRightWidth =
    index === arrayLength - 1 && index % 2 === 0
      ? marginWidth * 2 * rem
      : index % 2 === 0
      ? (marginWidth / 2) * rem
      : marginWidth * rem;
  const marginBottomWidth = index === arrayLength - 1 ? marginWidth * rem : 0;
  return {
    marginLeftWidth,
    marginRightWidth,
    marginBottomWidth
  };
}

const FlowerListItem = ({ item, index, arrayLength, onFlowerPress, onFavoritePress }) => {
  const { id, name, latin_name, sightings, profile_picture, favorite } = item;
  const { marginLeftWidth, marginRightWidth, marginBottomWidth } = calculateMargins(index, arrayLength);
  return (
    <View
      style={[
        styles.listItemWrapper,
        {
          marginLeft: marginLeftWidth,
          marginRight: marginRightWidth,
          marginBottom: marginBottomWidth
        }
      ]}>
      <CardItem
        {...{
          title: name,
          subTitle: latin_name,
          additionalInfo: sightings,
          image: profile_picture,
          onItemPress: () => onFlowerPress(id),
          onIconPress: () => onFavoritePress(id),
          isFavorite: favorite
        }}
      />
    </View>
  );
};

FlowerListItem.propTypes = {
  item: flowerPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  arrayLength: PropTypes.number.isRequired,
  onFlowerPress: PropTypes.func.isRequired,
  onFavoritePress: PropTypes.func.isRequired
};

export default React.memo(FlowerListItem);
