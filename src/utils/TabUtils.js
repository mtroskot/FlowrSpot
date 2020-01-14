import homeActive from 'src/assets/icons/tabs/active/home/home.png';
import commentActive from 'src/assets/icons/tabs/active/comments/comment.png';
import locationActive from 'src/assets/icons/tabs/active/location/location.png';
import mapActive from 'src/assets/icons/tabs/active/map/map.png';
import homeInactive from 'src/assets/icons/tabs/inactive/home/home.png';
import commentInactive from 'src/assets/icons/tabs/inactive/comments/comment.png';
import locationInactive from 'src/assets/icons/tabs/inactive/location/location.png';
import mapInactive from 'src/assets/icons/tabs/inactive/map/map.png';
import { screenNames, stackNames } from 'src/constants/navigation';

function getTabProps(routeName, focused) {
  let icon;

  if (routeName === screenNames.HOME || routeName === stackNames.HOME_STACK) {
    icon = focused ? homeActive : homeInactive;
  } else if (routeName === screenNames.COMMENTS || routeName === stackNames.COMMENTS_STACK) {
    icon = focused ? commentActive : commentInactive;
  } else if (routeName === screenNames.LOCATION || routeName === stackNames.LOCATION_STACK) {
    icon = focused ? locationActive : locationInactive;
  } else if (routeName === screenNames.MAP || routeName === stackNames.MAP_STACK) {
    icon = focused ? mapActive : mapInactive;
  }
  return {
    icon
  };
}

function checkIfTabBarShouldBeVisible(navigation) {
  return { tabBarVisible: navigation.state.index <= 0 };
}

const TabUtils = {
  getTabProps,
  checkIfTabBarShouldBeVisible
};

export default TabUtils;
