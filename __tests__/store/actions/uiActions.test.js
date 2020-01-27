import configureStore from 'redux-mock-store';
import * as uiActions from 'src/store/actions/uiActions';
import { uiActionTypes } from 'src/constants/actionTypes';

jest.mock('src/utils', () => {
  return {
    ObjectUtils: {
      isObject: jest
        .fn()
        .mockReturnValue(false)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
    }
  };
});

const middlewares = [];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {};
const store = mockStore(initialState);

describe('UI actions tests', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches startAction action 1', () => {
    const name = 'name';
    const params = { id: 'id' };
    const expectedActions = [
      {
        type: uiActionTypes.START_ACTION,
        payload: {
          action: {
            name,
            params
          }
        }
      }
    ];
    store.dispatch(uiActions.startAction(name, params));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches startAction action 2, params undefined', () => {
    const name = 'name';
    const expectedActions = [
      {
        type: uiActionTypes.START_ACTION,
        payload: { action: { name } }
      }
    ];
    store.dispatch(uiActions.startAction(name));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches startAction action 2a,params null, error expected', () => {
    const name = 'name';
    expect(() => {
      store.dispatch(uiActions.startAction(name, null));
    }).toThrow();
  });

  it('dispatches startAction action 3,params of type string, error expected', () => {
    const name = 'name';
    const params = 'params';
    expect(() => {
      store.dispatch(uiActions.startAction(name, params));
    }).toThrow();
  });

  it('dispatches startAction action 4,params null, error expected', () => {
    const name = 'name';
    const params = null;
    expect(() => {
      store.dispatch(uiActions.startAction(name, params));
    }).toThrow();
  });

  it('dispatches stopAction action', () => {
    const name = 'name';
    const expectedActions = [
      {
        type: uiActionTypes.STOP_ACTION,
        payload: { name }
      }
    ];
    store.dispatch(uiActions.stopAction(name));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches refreshActionStart action', () => {
    const refreshAction = 'refreshAction';
    const expectedActions = [
      {
        type: uiActionTypes.REFRESH_ACTION_START,
        payload: { refreshAction }
      }
    ];
    store.dispatch(uiActions.refreshActionStart(refreshAction));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches refreshActionStop action', () => {
    const refreshAction = 'narefreshActionme';
    const expectedActions = [
      {
        type: uiActionTypes.REFRESH_ACTION_STOP,
        payload: { refreshAction }
      }
    ];
    store.dispatch(uiActions.refreshActionStop(refreshAction));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches togglePopupMessage action', () => {
    const message = 'message';
    const position = 'position';
    const expectedActions = [
      {
        type: uiActionTypes.TOGGLE_POPUP_MESSAGE,
        payload: { message, position }
      }
    ];
    store.dispatch(uiActions.togglePopupMessage(message, position));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });
});
