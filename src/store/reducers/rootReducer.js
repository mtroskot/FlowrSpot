import { combineReducers } from 'redux';
import userReducer from 'src/store/reducers/userReducer';
import uiReducer from 'src/store/reducers/uiReducer';
import flowerReducer from 'src/store/reducers/flowerReducer';
import { userActionTypes } from 'src/constants/actionTypes';

const appReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  flower: flowerReducer
});

const rootReducer = (state, action) => {
  if (action.type === userActionTypes.LOGOUT_USER) {
    state = undefined; //redux-store reset
  }
  return appReducer(state, action);
};

export default rootReducer;
