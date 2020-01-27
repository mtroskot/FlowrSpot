import { StringUtils } from 'src/utils';

export const checkIfLoading = (store, ...actionsToCheck) =>
  store.ui.loader.actions.some(action => actionsToCheck.includes(action.name));

export const checkIfRefreshing = (store, actionToCheck) =>
  store.ui.loader.refreshing.some(action => action === actionToCheck);

export const getFullUserName = store => {
  const { firstName, lastName } = store.user;
  if (StringUtils.areEmpty(firstName, lastName)) {
    return null;
  }
  return `${firstName} ${lastName}`;
};

export const getUserAuthToken = store => store.user.authToken;
export const checkIfUserAuthenticated = store => StringUtils.isNotEmpty(getUserAuthToken(store));

export const getUpdatingItemId = (store, ...actionsToCheck) => {
  let id = undefined;
  for (let i = 0; i < store.ui.loader.actions.length; i++) {
    const action = store.ui.loader.actions[i];
    if (actionsToCheck.includes(action.name)) {
      id = action.params?.id;
      break;
    }
  }
  return id;
};
