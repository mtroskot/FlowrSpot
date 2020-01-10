import { Platform } from 'react-native';
import HomeScreen from 'src/screens/Home';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { screenNames } from 'src/constants/navigation';

const RootStack = createStackNavigator(
  {
    [screenNames.HOME]: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Home'
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerBackTitleVisible: false,
      headerMode: 'screen',
      headerStyle: {
        // backgroundColor: '#f4511e'
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
        fontWeight: 'bold'
      }
    }
  }
);

export default createAppContainer(RootStack);
