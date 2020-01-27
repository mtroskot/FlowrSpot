import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from 'src/screens/Menu/styles';
import { menuList } from 'src/constants/menu';
import { screenNames } from 'src/constants/navigation';
import { StringUtils } from 'src/utils';

const MenuList = ({ fullUserName, onMenuPress }) => {
  return (
    <>
      {menuList.map((item, index) => {
        if (item.menuId === screenNames.LOGIN && StringUtils.isNotEmpty(fullUserName)) {
          return null;
        }
        return (
          <TouchableOpacity
            key={item.menuId}
            style={[styles.menuTextWrapper, index === 0 ? styles.marginTop : null]}
            onPress={() => onMenuPress(item.menuId)}>
            <Text
              style={{
                ...styles.menuText,
                color: index !== menuList.length - 1 ? styles.menuText.color : '#EAA79E'
              }}>
              {item.text}
            </Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

MenuList.propTypes = {
  fullUserName: PropTypes.string,
  onMenuPress: PropTypes.func.isRequired
};

export default React.memo(MenuList);
