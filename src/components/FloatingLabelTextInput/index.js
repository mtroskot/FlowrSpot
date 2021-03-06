import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, TextInput, View } from 'react-native';
import styles from 'src/components/FloatingLabelTextInput/styles';
import StringUtils from 'src/utils/StringUtils';
import { dimensions } from 'src/styles';
import HooksUtils from 'src/utils/HooksUtils';

const { rem } = dimensions;

const FloatingLabelTextInput = ({
  onSubmitEditing,
  textInputRef,
  floatingLabel,
  value,
  textInputStyle,
  customContainerStyle,
  ...restProps
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [focused, setFocused] = useState(false);

  HooksUtils.useDidUpdate(() => {
    if (StringUtils.isEmpty(value)) {
      Animated.timing(fadeAnim, {
        toValue: focused ? 1 : 0,
        duration: 250
      }).start();
    }
  }, [focused]);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <View style={[styles.container, customContainerStyle]}>
      <View style={styles.subContainer}>
        {floatingLabel && (
          <Animated.Text
            style={{
              ...styles.label,
              paddingBottom: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [5 * rem, 25 * rem]
              })
            }}>
            {floatingLabel}
          </Animated.Text>
        )}
        <TextInput
          value={value}
          underlineColorAndroid="transparent"
          ref={textInputRef}
          onSubmitEditing={onSubmitEditing}
          style={[styles.defaultInput, textInputStyle]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...restProps}
        />
      </View>
    </View>
  );
};

FloatingLabelTextInput.propTypes = {
  onSubmitEditing: PropTypes.func,
  textInputRef: PropTypes.shape({ current: PropTypes.any }),
  floatingLabel: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default React.memo(FloatingLabelTextInput);
