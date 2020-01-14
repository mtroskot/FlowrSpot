import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import homeBackground from 'src/assets/images/background/home-background.png';
import star from 'src/assets/icons/star/star.png';
import styles from 'src/components/CardItem/styles';

const CardItem = ({ id, title, subTitle, additionalInfo, isFavorite, onFavoritePress }) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <ImageBackground source={homeBackground} style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.starContainer}
          onPress={() => {
            onFavoritePress(id);
          }}>
          <View style={styles.starSubContainer}>
            <Image source={star} style={{ tintColor: isFavorite ? '#ffc20d' : null }} />
          </View>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <View style={styles.ovalTextBackground}>
            <Text style={styles.additionalInfo}>{additionalInfo}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

CardItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  additionalInfo: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavoritePress: PropTypes.func.isRequired
};

export default React.memo(CardItem);
