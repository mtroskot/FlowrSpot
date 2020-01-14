import React from 'react';
import { Image, Platform } from 'react-native';
import { IconButton } from 'src/components';
import HomeScreen from 'src/screens/Home';
import CommentsScreen from 'src/screens/Comments';
import SightingsScreen from 'src/screens/Sightings';
import MapScreen from 'src/screens/Map';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { screenNames, stackNames } from 'src/constants/navigation';
import titleLogo from 'src/assets/icons/title/title-logo.png';
import menuDots from 'src/assets/icons/menu/menu-dots.png';
import { TabUtils } from 'src/utils';
import styles from 'src/navigation/styles';
import { NavigationService } from 'src/services';
import iconButtonStyles from 'src/components/IconButton/styles';

const HomeStack = createStackNavigator(
  {
    [screenNames.HOME]: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: <Image source={titleLogo} />,
        headerRight:
          Platform.OS === 'ios' ? (
            <IconButton icon={menuDots} onPress={() => alert('Coming soon')} style={iconButtonStyles.rightButton} />
          ) : null,
        headerLeft:
          Platform.OS !== 'ios' ? (
            <IconButton icon={menuDots} onPress={() => alert('Coming soon')} style={iconButtonStyles.leftButton} />
          ) : null
      })
    }
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerStyle: styles.headerStyle
    }
  }
);

const AppStack = createBottomTabNavigator(
  {
    [stackNames.HOME_STACK]: HomeStack,
    [stackNames.COMMENTS_STACK]: CommentsScreen,
    [stackNames.LOCATION_STACK]: SightingsScreen,
    [stackNames.MAP_STACK]: MapScreen
  },
  {
    initialRouteName: stackNames.HOME,
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return {
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ focused }) => {
          const { icon } = TabUtils.getTabProps(routeName, focused);
          return <IconButton onPress={() => NavigationService.navigate(routeName)} icon={icon} />;
        },
        tabBarOptions: {
          showLabel: false
        }
      };
    }
  }
);

export default createAppContainer(AppStack);
