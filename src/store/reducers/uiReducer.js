import { uiActionTypes } from 'src/constants/actionTypes';

const initialState = {
  loader: {
    actions: [],
    refreshing: []
  },
  popupMessage: {
    message: null,
    position: null
  },
  errors: []
};

const uiReducer = (state = initialState, { type, payload }) => {
  const { loader } = state;
  const { actions, refreshing } = loader;
  switch (type) {
    case uiActionTypes.START_ACTION:
      return {
        ...state,
        loader: {
          ...loader,
          actions: [...actions, payload.action]
        }
      };
    case uiActionTypes.STOP_ACTION:
      return {
        ...state,
        loader: {
          ...loader,
          actions: actions.filter(action => action.name !== payload.name)
        }
      };
    case uiActionTypes.REFRESH_ACTION_START:
      return {
        ...state,
        loader: {
          ...loader,
          refreshing: [...refreshing, payload.refreshAction]
        }
      };
    case uiActionTypes.REFRESH_ACTION_STOP:
      return {
        ...state,
        loader: {
          ...loader,
          refreshing: refreshing.filter(refresh => refresh !== payload.refreshAction)
        }
      };
    case uiActionTypes.TOGGLE_POPUP_MESSAGE:
      return {
        ...state,
        popupMessage: {
          message: payload.message,
          position: payload.position
        }
      };
    default:
      return state;
  }
};

export default uiReducer;
