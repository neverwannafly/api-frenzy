import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';

import forms from './forms';
import user from './user';
import toast from './toast';

const reducers = combineReducers({
  forms, user, toast,
});

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];

const composeEnhancers = typeof window === 'object'
  && ['development', 'staging'].includes(window?.ENV_VARS?.mode)
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

const enhancer = composeEnhancers(...enhancers);

const store = createStore(reducers, enhancer);

export default store;
