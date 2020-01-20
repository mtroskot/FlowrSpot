import React from 'react';
import { Image, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const IconButton = ({ icon, onPress, disabled, viewStyle, imageStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={viewStyle}
      disabled={disabled}
      hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
      <Image source={icon} style={imageStyle} />
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  icon: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  viewStyle: ViewPropTypes.style,
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default React.memo(IconButton);
