import React from 'react';
import { View } from 'react-native';
import { CardItem } from 'src/components';
import PropTypes from 'prop-types';
import { favoriteFlowerListPropTypes, flowerPropTypes } from 'src/constants/propTypes';
import styles from 'src/screens/Home/FlowerList/ListItem/styles';
import { AppUtils } from 'src/utils';

const FlowerListItem = ({
  item,
  index,
  arrayLength,
  onFlowerPress,
  onFavoritePress,
  onUnfavoritePress,
  isAuthenticated,
  updatingItemId,
  favoriteFlowerList
}) => {
  const { id, name, latin_name, sightings, profile_picture } = item;
  const { marginLeftWidth, marginRightWidth, marginBottomWidth } = AppUtils.calculateFlatListItemMargins(
    index,
    arrayLength
  );
  const favorite = favoriteFlowerList.find(favorite => favorite.flowerId === id);
  const onIconPress = favorite ? () => onUnfavoritePress(id, favorite.favoriteId) : () => onFavoritePress(id);
  return (
    <View
      style={[
        styles.listItemWrapper,
        { marginLeft: marginLeftWidth, marginRight: marginRightWidth, marginBottom: marginBottomWidth }
      ]}>
      <CardItem
        {...{
          id,
          title: name,
          subTitle: latin_name,
          additionalInfo: sightings,
          image: profile_picture,
          onItemPress: () => onFlowerPress(id),
          onIconPress,
          isFavorite: !!favorite,
          isAuthenticated,
          updatingItemId
        }}
      />
    </View>
  );
};

FlowerListItem.propTypes = {
  item: flowerPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  arrayLength: PropTypes.number.isRequired,
  favoriteFlowerList: favoriteFlowerListPropTypes.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  updatingItemId: PropTypes.number,
  onFlowerPress: PropTypes.func.isRequired,
  onFavoritePress: PropTypes.func.isRequired,
  onUnfavoritePress: PropTypes.func.isRequired
};

export default React.memo(FlowerListItem);
