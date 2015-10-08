import React from 'react'
import {Router} from 'react-router'
import {render} from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {compose, createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import requestMiddleware from 'redux-request-middleware'
import {fromJS} from 'immutable'

import reducers from '../shared/reducers'
import routes from '../shared/routes'

import './css/index.styl'

const initial_state = window.__INITIAL_STATE__
  const reducer = combineReducers(reducers)
const history = createBrowserHistory()

//
let finalCreateStore
const middlewares = applyMiddleware(thunk, requestMiddleware)
if (__DEBUG__) {
  const {devTools, persistState} = require('redux-devtools')
  finalCreateStore = compose(
    middlewares,
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)) // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  )(createStore)
} else {
  finalCreateStore = middlewares(createStore)
}
Object.keys(initial_state).forEach(key => {initial_state[key] = fromJS(initial_state[key])})
const store = finalCreateStore(reducer, initial_state)

//
let to_render = (
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>
)
if (__DEBUG__) {
  const {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react')
  to_render = (
    <div>
      {to_render}
      <DebugPanel top left bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>
  )
}

render(to_render, document.getElementById('react-view'))
