import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';

const CustomButton = props => {
  const { iconProps, tOpacityStyle, viewStyle, textStyle, iconStyle, text, onPress, activeOpacity } = props;
  const buttonText = text ? <Text style={textStyle}>{text}</Text> : null;

  const buttonIcon = iconProps ? (
    <View style={iconStyle}>
      <Image source={iconProps.name} style={iconProps.iconStyle} />
    </View>
  ) : null;

  let iconTextOrder = (
    <View style={viewStyle}>
      {iconProps && iconProps.rightSide ? (
        <>
          {buttonText}
          {buttonIcon}
        </>
      ) : (
        <>
          {buttonIcon}
          {buttonText}
        </>
      )}
    </View>
  );

  return (
    <TouchableOpacity style={tOpacityStyle} onPress={onPress} activeOpacity={activeOpacity}>
      {iconTextOrder}
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  iconOrText: function(props, propName, componentName) {
    if (!props.iconProps?.name && !props.text) {
      return new Error(`Icon or text is required in ${componentName}`);
    }
  },
  iconProps: PropTypes.exact({
    name: PropTypes.number.isRequired,
    iconStyle: PropTypes.object,
    rightSide: PropTypes.bool
  }),
  text: PropTypes.string,
  tOpacityStyle: ViewPropTypes.style,
  viewStyle: ViewPropTypes.style,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.object,
  iconStyle: ViewPropTypes.style,
  onPress: PropTypes.func.isRequired,
  activeOpacity: PropTypes.number
};

CustomButton.defaultProps = {
  activeOpacity: 0.2
};

export default React.memo(CustomButton);
