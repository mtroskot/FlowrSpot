import React from 'react';
import { Text, View } from 'react-native';

const LatestSightings = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>LatestSightings</Text>
    </View>
  );
};

LatestSightings.propTypes = {};

export default React.memo(LatestSightings);
