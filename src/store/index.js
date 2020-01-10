import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'src/store/sagas/rootSaga';
import additionalMiddlewares from 'src/store/middlewares';
import rootReducer from 'src/store/reducers/rootReducer';

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [...additionalMiddlewares, sagaMiddleware];
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
}

const store = configureStore();
export default store;
