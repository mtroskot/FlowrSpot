import React from 'react';
import { Text, View } from 'react-native';

const Comments = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>Comments</Text>
    </View>
  );
};

Comments.propTypes = {};

export default React.memo(Comments);
