import { screenNames } from 'src/constants/navigation';

export const menuList = Object.freeze([
  {
    menuId: screenNames.FLOWERS,
    text: 'Flowers'
  },
  {
    menuId: screenNames.LATEST_SIGHTINGS,
    text: 'Latest Sightings'
  },
  {
    menuId: screenNames.FAVORITES,
    text: 'Favorites'
  },
  {
    menuId: screenNames.SETTINGS,
    text: 'Settings'
  },
  {
    menuId: screenNames.LOGIN,
    text: 'Login'
  }
]);
