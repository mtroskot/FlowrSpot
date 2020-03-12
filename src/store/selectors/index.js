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
  const action = store.ui.loader.actions.find(
    action => actionsToCheck.includes(action.name) && Number.isInteger(action.params?.id)
  );
  return action?.params.id;
};
