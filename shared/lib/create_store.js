import {createStore as _createStore, compose, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import requestMiddleware from 'redux-request-middleware'
import {fromJS} from 'immutable'
import reducers from '../reducers'

const CLIENT_DEVTOOLS = false

export default function createStore(initial_state) {

  const reducer = combineReducers(reducers)

  //
  let finalCreateStore
  const middlewares = applyMiddleware(thunk, requestMiddleware)
  if (CLIENT_DEVTOOLS) {
    const {devTools, persistState} = require('redux-devtools')
    finalCreateStore = compose(
      middlewares,
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)) // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    )(_createStore)
  }
  else {
    finalCreateStore = middlewares(_createStore)
  }

  Object.keys(initial_state).forEach(key => {initial_state[key] = fromJS(initial_state[key])})
  const store = finalCreateStore(reducer, initial_state)

  return store

}


// import { createStore as _createStore, applyMiddleware, compose } from 'redux';
// import createMiddleware from './middleware/clientMiddleware';
// import transitionMiddleware from './middleware/transitionMiddleware';

// export default function createStore(reduxReactRouter, getRoutes, createHistory, client, data) {
//   const middleware = [createMiddleware(client), transitionMiddleware];

//   let finalCreateStore;
//   if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
//     const { persistState } = require('redux-devtools');
//     const DevTools = require('../containers/DevTools/DevTools');
//     finalCreateStore = compose(
//       applyMiddleware(...middleware),
//       DevTools.instrument(),
//       persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
//     )(_createStore);
//   } else {
//     finalCreateStore = applyMiddleware(...middleware)(_createStore);
//   }

//   finalCreateStore = reduxReactRouter({ getRoutes, createHistory })(finalCreateStore);

//   const reducer = require('./modules/reducer');
//   const store = finalCreateStore(reducer, data);

//   if (__DEVELOPMENT__ && module.hot) {
//     module.hot.accept('./modules/reducer', () => {
//       store.replaceReducer(require('./modules/reducer'));
//     });
//   }

//   return store;
// }
