import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'src/components/index';
import PropTypes from 'prop-types';
import star from 'src/assets/icons/star/star.png';
import styles from 'src/components/CardItem/styles';
import { dimensions } from 'src/styles';
const { rem } = dimensions;
const CardItem = ({ title, subTitle, additionalInfo, image, isFavorite, onItemPress, onIconPress }) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <ImageBackground source={{ uri: `https:${image}` }} style={styles.imageContainer}>
        <View style={styles.starContainer}>
          <IconButton
            icon={star}
            viewStyle={styles.starSubContainer}
            imageStyle={{ tintColor: isFavorite ? '#ffc20d' : null, width: 12 * rem, height: 12 * rem }}
            onPress={onIconPress}
          />
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
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  additionalInfo: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onIconPress: PropTypes.func.isRequired,
  onItemPress: PropTypes.func.isRequired
};

export default React.memo(CardItem);
