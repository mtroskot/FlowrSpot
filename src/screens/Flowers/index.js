import React from 'react';
import { Text, View } from 'react-native';

const Flowers = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>Flowers</Text>
    </View>
  );
};

Flowers.propTypes = {};

export default React.memo(Flowers);
