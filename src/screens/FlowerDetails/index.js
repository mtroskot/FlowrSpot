import React from 'react';
import { Text, View } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const FlowerDetails = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ ...fonts.style.normal, textAlign: 'center', fontSize: 16 * rem }}>
        FlowerDetails id {props.navigation.state.params.flowerId}
      </Text>
    </View>
  );
};

FlowerDetails.propTypes = {};

export default React.memo(FlowerDetails);
