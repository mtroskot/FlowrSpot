import React from 'react';
import { Text, View } from 'react-native';

const Settings = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>Settings</Text>
    </View>
  );
};

Settings.propTypes = {};

export default React.memo(Settings);
