import { combineReducers } from 'redux';
import userReducer from 'src/store/reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer
});

export default rootReducer;
