import React from 'react';
import { Text, View } from 'react-native';

const Favorites = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>Favorites</Text>
    </View>
  );
};

Favorites.propTypes = {};

export default React.memo(Favorites);
