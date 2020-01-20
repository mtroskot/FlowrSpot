import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// import PropTypes from 'prop-types';
// import styles from 'src/screens/Menu/styles';
import { fonts } from 'src/styles';

const screens = ['Flowers', 'Latest Sightings', 'Favorites', 'Settings', 'Login'];

const Menu = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <View style={{ paddingLeft: 20 }}>
        {screens.map((item, index) => (
          <Text
            style={{
              ...fonts.style.normal,
              color: index !== screens.length - 1 ? '#949EA0' : '#EAA79E',
              fontSize: 16,
              marginTop: 53
            }}>
            {item}
          </Text>
        ))}
        <TouchableOpacity style={{ backgroundColor: '#EAA79E', borderRadius: 25, marginTop: 53, width: '40%' }}>
          <Text style={{ ...fonts.style.normal, color: 'white', fontSize: 18, padding: 10, textAlign: 'center' }}>
            New Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Menu.propTypes = {};

export default React.memo(Menu);
