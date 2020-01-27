import uiReducer from 'src/store/reducers/uiReducer';
import * as uiActions from 'src/store/actions/uiActions';

jest.mock('src/utils', () => ({
  ObjectUtils: { isObject: jest.fn().mockReturnValue(true) }
}));

const initialState = {
  loader: {
    actions: [],
    refreshing: []
  },
  popupMessage: {
    message: null,
    position: null
  }
};

describe('INITIAL_STATE', () => {
  const beforeActionState = initialState;

  it('1returns initial state', () => {
    const action = { type: 'dummy_action' };
    const expectedState = beforeActionState;
    expect(uiReducer(beforeActionState, action)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('2returns start action state', () => {
    const name = 'ACTION_NAME';
    const startAction = uiActions.startAction(name);
    const expectedState = {
      loader: {
        actions: [startAction.payload.action],
        refreshing: []
      },
      popupMessage: {
        message: null,
        position: null
      }
    };
    expect(uiReducer(beforeActionState, startAction)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, startAction)).toMatchSnapshot();
  });

  it('3returns stop action state', () => {
    const name = 'ACTION_NAME';
    const stopAction = uiActions.stopAction(name);
    const expectedState = {
      loader: {
        actions: [],
        refreshing: []
      },
      popupMessage: {
        message: null,
        position: null
      }
    };
    expect(uiReducer(beforeActionState, stopAction)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, stopAction)).toMatchSnapshot();
  });

  it('4returns refresh action start state', () => {
    const name = 'ACTION_NAME';
    const refreshActionStart = uiActions.refreshActionStart(name);
    const expectedState = {
      loader: {
        actions: [],
        refreshing: [refreshActionStart.payload.refreshAction]
      },
      popupMessage: {
        message: null,
        position: null
      }
    };
    expect(uiReducer(beforeActionState, refreshActionStart)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, refreshActionStart)).toMatchSnapshot();
  });

  it('5returns refresh action stop state', () => {
    const name = 'ACTION_NAME';
    const refreshActionStop = uiActions.refreshActionStop(name);
    const expectedState = {
      loader: {
        actions: [],
        refreshing: []
      },
      popupMessage: {
        message: null,
        position: null
      }
    };
    expect(uiReducer(beforeActionState, refreshActionStop)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, refreshActionStop)).toMatchSnapshot();
  });

  it('6returns toggle popup message state', () => {
    const message = 'message';
    const position = 'position';
    const togglePopupMessage = uiActions.togglePopupMessage(message, position);
    const expectedState = {
      loader: {
        actions: [],
        refreshing: []
      },
      popupMessage: {
        message: message,
        position: position
      }
    };
    expect(uiReducer(beforeActionState, togglePopupMessage)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, togglePopupMessage)).toMatchSnapshot();
  });
});

describe('START_ACTION_STATE', () => {
  const beforeActionState = {
    ...initialState,
    loader: {
      actions: [{ name: 'ACTION_NAME' }, { name: 'ACTION_NAME' }, { name: 'ACTION_NAME2' }],
      refreshing: []
    }
  };

  it('7returns initial state', () => {
    const action = { type: 'dummy_action' };
    const expectedState = beforeActionState;
    expect(uiReducer(beforeActionState, action)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('8returns start action state', () => {
    const name = 'ACTION_NAME';
    const startAction = uiActions.startAction(name);
    const expectedState = {
      loader: {
        actions: [...beforeActionState.loader.actions, startAction.payload.action],
        refreshing: []
      },
      popupMessage: {
        message: null,
        position: null
      }
    };
    expect(uiReducer(beforeActionState, startAction)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, startAction)).toMatchSnapshot();
  });

  it('9returns stop action state', () => {
    const name = 'ACTION_NAME';
    const stopAction = uiActions.stopAction(name);
    const expectedState = {
      loader: {
        actions: [{ name: 'ACTION_NAME2' }],
        refreshing: []
      },
      popupMessage: {
        message: null,
        position: null
      }
    };
    expect(uiReducer(beforeActionState, stopAction)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, stopAction)).toMatchSnapshot();
  });

  it('10returns refresh action start state', () => {
    const name = 'ACTION_NAME';
    const refreshActionStart = uiActions.refreshActionStart(name);
    const expectedState = {
      loader: {
        actions: beforeActionState.loader.actions,
        refreshing: [refreshActionStart.payload.refreshAction]
      },
      popupMessage: {
        message: null,
        position: null
      }
    };
    expect(uiReducer(beforeActionState, refreshActionStart)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, refreshActionStart)).toMatchSnapshot();
  });

  it('11returns refresh action stop state', () => {
    const name = 'ACTION_NAME';
    const refreshActionStop = uiActions.refreshActionStop(name);
    const expectedState = {
      loader: {
        actions: beforeActionState.loader.actions,
        refreshing: []
      },
      popupMessage: {
        message: null,
        position: null
      }
    };
    expect(uiReducer(beforeActionState, refreshActionStop)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, refreshActionStop)).toMatchSnapshot();
  });

  it('12returns toggle popup message state', () => {
    const message = 'message';
    const position = 'position';
    const togglePopupMessage = uiActions.togglePopupMessage(message, position);
    const expectedState = {
      loader: {
        actions: beforeActionState.loader.actions,
        refreshing: []
      },
      popupMessage: {
        message: message,
        position: position
      }
    };
    expect(uiReducer(beforeActionState, togglePopupMessage)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, togglePopupMessage)).toMatchSnapshot();
  });
});

describe('REFRESH_ACTION_START_STATE', () => {
  const beforeActionState = {
    ...initialState,
    loader: {
      actions: [],
      refreshing: ['ACTION_NAME', 'ACTION_NAME', 'ACTION_NAME2']
    }
  };

  it('13returns initial state', () => {
    const action = { type: 'dummy_action' };
    const expectedState = beforeActionState;
    expect(uiReducer(beforeActionState, action)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('14returns start action state', () => {
    const name = 'ACTION_NAME';
    const startAction = uiActions.startAction(name);
    const expectedState = {
      loader: {
        actions: [startAction.payload.action],
        refreshing: beforeActionState.loader.refreshing
      },
      popupMessage: {
        message: null,
        position: null
      }
    };
    expect(uiReducer(beforeActionState, startAction)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, startAction)).toMatchSnapshot();
  });

  it('15returns stop action state', () => {
    const name = 'ACTION_NAME';
    const stopAction = uiActions.stopAction(name);
    const expectedState = {
      loader: {
        actions: [],
        refreshing: beforeActionState.loader.refreshing
      },
      popupMessage: {
        message: null,
        position: null
      }
    };
    expect(uiReducer(beforeActionState, stopAction)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, stopAction)).toMatchSnapshot();
  });

  it('16returns refresh action start state', () => {
    const name = 'ACTION_NAME';
    const refreshActionStart = uiActions.refreshActionStart(name);
    const expectedState = {
      loader: {
        actions: [],
        refreshing: [...beforeActionState.loader.refreshing, refreshActionStart.payload.refreshAction]
      },
      popupMessage: {
        message: null,
        position: null
      }
    };
    expect(uiReducer(beforeActionState, refreshActionStart)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, refreshActionStart)).toMatchSnapshot();
  });

  it('17returns refresh action stop state', () => {
    const name = 'ACTION_NAME';
    const refreshActionStop = uiActions.refreshActionStop(name);
    const expectedState = {
      loader: {
        actions: [],
        refreshing: ['ACTION_NAME2']
      },
      popupMessage: {
        message: null,
        position: null
      }
    };
    expect(uiReducer(beforeActionState, refreshActionStop)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, refreshActionStop)).toMatchSnapshot();
  });

  it('18returns toggle popup message state', () => {
    const message = 'message';
    const position = 'position';
    const togglePopupMessage = uiActions.togglePopupMessage(message, position);
    const expectedState = {
      loader: {
        actions: [],
        refreshing: beforeActionState.loader.refreshing
      },
      popupMessage: {
        message: message,
        position: position
      }
    };
    expect(uiReducer(beforeActionState, togglePopupMessage)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, togglePopupMessage)).toMatchSnapshot();
  });
});

describe('TOGGLE_POPUP_MESSAGE_STATE', () => {
  const beforeActionState = {
    ...initialState,
    popupMessage: {
      message: 'message',
      position: 'position'
    }
  };

  it('19returns initial state', () => {
    const action = { type: 'dummy_action' };
    const expectedState = beforeActionState;
    expect(uiReducer(beforeActionState, action)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, action)).toMatchSnapshot();
  });

  it('20returns start action state', () => {
    const name = 'ACTION_NAME';
    const startAction = uiActions.startAction(name);
    const expectedState = {
      loader: {
        actions: [startAction.payload.action],
        refreshing: []
      },
      popupMessage: {
        message: beforeActionState.popupMessage.message,
        position: beforeActionState.popupMessage.position
      }
    };
    expect(uiReducer(beforeActionState, startAction)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, startAction)).toMatchSnapshot();
  });

  it('21returns stop action state', () => {
    const name = 'ACTION_NAME';
    const stopAction = uiActions.stopAction(name);
    const expectedState = {
      loader: {
        actions: [],
        refreshing: []
      },
      popupMessage: {
        message: beforeActionState.popupMessage.message,
        position: beforeActionState.popupMessage.position
      }
    };
    expect(uiReducer(beforeActionState, stopAction)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, stopAction)).toMatchSnapshot();
  });

  it('22returns refresh action start state', () => {
    const name = 'ACTION_NAME';
    const refreshActionStart = uiActions.refreshActionStart(name);
    const expectedState = {
      loader: {
        actions: [],
        refreshing: [refreshActionStart.payload.refreshAction]
      },
      popupMessage: {
        message: beforeActionState.popupMessage.message,
        position: beforeActionState.popupMessage.position
      }
    };
    expect(uiReducer(beforeActionState, refreshActionStart)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, refreshActionStart)).toMatchSnapshot();
  });

  it('23returns refresh action stop state', () => {
    const name = 'ACTION_NAME';
    const refreshActionStop = uiActions.refreshActionStop(name);
    const expectedState = {
      loader: {
        actions: [],
        refreshing: []
      },
      popupMessage: {
        message: beforeActionState.popupMessage.message,
        position: beforeActionState.popupMessage.position
      }
    };
    expect(uiReducer(beforeActionState, refreshActionStop)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, refreshActionStop)).toMatchSnapshot();
  });

  it('24returns toggle popup message state', () => {
    const message = 'message2';
    const position = 'position2';
    const togglePopupMessage = uiActions.togglePopupMessage(message, position);
    const expectedState = {
      loader: {
        actions: [],
        refreshing: beforeActionState.loader.refreshing
      },
      popupMessage: {
        message: togglePopupMessage.payload.message,
        position: togglePopupMessage.payload.position
      }
    };
    expect(uiReducer(beforeActionState, togglePopupMessage)).toEqual(expectedState);
    expect(uiReducer(beforeActionState, togglePopupMessage)).toMatchSnapshot();
  });
});
