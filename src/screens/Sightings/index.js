import React from 'react';
import { Text, View } from 'react-native';

const Sightings = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>Sightings</Text>
    </View>
  );
};

Sightings.propTypes = {};

export default React.memo(Sightings);
