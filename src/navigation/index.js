import React from 'react';
import { Image, Platform } from 'react-native';
import { IconButton } from 'src/components';
import CommentsScreen from 'src/screens/Comments';
import FlowerDetailsScreen from 'src/screens/FlowerDetails';
import HomeScreen from 'src/screens/Home';
import MapScreen from 'src/screens/Map';

import MenuScreen from 'src/screens/Menu';
import FlowersScreen from 'src/screens/Flowers';
import LatestSightingsScreen from 'src/screens/LatestSightings';
import FavoritesScreen from 'src/screens/Favorites';
import SettingsScreen from 'src/screens/Settings';
import LoginScreen from 'src/screens/Login';
import RegisterScreen from 'src/screens/Register';

import SightingsScreen from 'src/screens/Sightings';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { screenNames, stackNames } from 'src/constants/navigation';
import titleLogo from 'src/assets/icons/title/title-logo.png';
import menuDots from 'src/assets/icons/menu/menu-dots.png';
import { TabUtils } from 'src/utils';
import styles from 'src/navigation/styles';
import iconButtonStyles from 'src/components/IconButton/styles';
import { NavigationService } from 'src/services';

const HomeStack = createStackNavigator(
  {
    [screenNames.HOME]: {
      screen: HomeScreen,
      navigationOptions: () => ({
        ...Platform.select({
          ios: {
            headerRight: (
              <IconButton
                icon={menuDots}
                onPress={() => NavigationService.navigate(screenNames.MENU)}
                viewStyle={iconButtonStyles.rightButton}
                imageStyle={iconButtonStyles.menu}
              />
            )
          },
          android: {
            headerLeft: (
              <IconButton
                icon={menuDots}
                onPress={() => NavigationService.navigate(screenNames.MENU)}
                viewStyle={iconButtonStyles.leftButton}
                imageStyle={iconButtonStyles.menu}
              />
            )
          }
        })
      })
    },
    [screenNames.FLOWER_DETAILS]: FlowerDetailsScreen,
    [screenNames.MENU]: {
      screen: MenuScreen,
      navigationOptions: () => ({
        ...Platform.select({
          ios: {
            headerRight: (
              <IconButton
                icon={menuDots}
                onPress={NavigationService.goBack}
                viewStyle={iconButtonStyles.rightButton}
                imageStyle={iconButtonStyles.menu}
              />
            ),
            headerLeft: null
          },
          android: {
            headerLeft: (
              <IconButton
                icon={menuDots}
                onPress={NavigationService.goBack}
                viewStyle={iconButtonStyles.leftButton}
                imageStyle={iconButtonStyles.menu}
              />
            )
          }
        })
      })
    },
    [screenNames.FLOWERS]: FlowersScreen,
    [screenNames.LATEST_SIGHTINGS]: LatestSightingsScreen,
    [screenNames.FAVORITES]: FavoritesScreen,
    [screenNames.SETTINGS]: SettingsScreen,
    [screenNames.LOGIN]: LoginScreen,
    [screenNames.REGISTER]: RegisterScreen
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerTitle: <Image source={titleLogo} style={styles.headerTitle} />,
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
          return (
            <IconButton
              onPress={() => NavigationService.navigate(routeName)}
              icon={icon}
              imageStyle={iconButtonStyles.tabs}
            />
          );
        },
        tabBarOptions: {
          showLabel: false,
          style: styles.tabBarStyle
        }
      };
    }
  }
);

export default createAppContainer(AppStack);
