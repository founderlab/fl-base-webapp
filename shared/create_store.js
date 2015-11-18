import _ from 'lodash'
import {createStore as _createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import requestMiddleware from 'redux-request-middleware'
import dispatchNeedsMiddleware from './middleware/dispatch_needs'
import {fromJS} from 'immutable'

const CLIENT_DEVTOOLS = false
const MUTABLES = {
  router: 'always',
  admin: 1,
}

function immute(from_obj, parent_key, depth=0) {
  const obj = {}

  Object.keys(from_obj).forEach(key => {
    const mutable_key = parent_key || key
    const immute_at = MUTABLES[mutable_key]

    if (!immute_at || immute_at === depth) {
      obj[key] = fromJS(from_obj[key])
    }
    else if (immute_at > depth) {
      obj[key] = immute(from_obj[key], mutable_key, depth+1)
    }
    else obj[key] = from_obj[key]
  })

  return obj
}

export default function createStore(reduxReactRouter, getRoutes, createHistory, _initial_state) {
  const reducer = require('./reducer') // delay requiring reducers until needed
  const middlewares = applyMiddleware(thunk, requestMiddleware, dispatchNeedsMiddleware)
  let finalCreateStore

  if (CLIENT_DEVTOOLS) {
    const {devTools, persistState} = require('redux-devtools')
    finalCreateStore = compose(
      reduxReactRouter({getRoutes, createHistory}),
      middlewares,
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)), // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    )(_createStore)
  }
  else {
    finalCreateStore = compose(
      reduxReactRouter({getRoutes, createHistory}),
      middlewares,
    )(_createStore)
  }

  const initial_state = immute(_initial_state)
  const store = finalCreateStore(reducer, initial_state)
  return store
}


// devtools for 1.4

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
