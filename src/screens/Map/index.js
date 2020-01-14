import React from 'react';
import { Text, View } from 'react-native';

const Map = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>Map</Text>
    </View>
  );
};

Map.propTypes = {};

export default React.memo(Map);
