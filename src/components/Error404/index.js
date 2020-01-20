import React from 'react';
import { Image, Text, View } from 'react-native';
import sadFace from 'src/assets/images/emoji/sadFace.png';
import styles from 'src/components/Error404/styles';

const Error404 = () => {
  return (
    <View style={styles.container}>
      <Image source={sadFace} style={styles.image} />
      <Text style={styles.errorText}>Oops Something went wrong</Text>
    </View>
  );
};

export default React.memo(Error404);
