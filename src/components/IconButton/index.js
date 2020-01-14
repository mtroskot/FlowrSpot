import React from 'react';
import { Image, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const IconButton = ({ icon, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image source={icon} />
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  icon: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style
};

export default React.memo(IconButton);
