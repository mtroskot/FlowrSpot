import React from 'react';
import { Text, View } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const Comments = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ ...fonts.ubuntu.normal.regular, textAlign: 'center', fontSize: 16 * rem }}>Comments</Text>
    </View>
  );
};

Comments.propTypes = {};

export default React.memo(Comments);
