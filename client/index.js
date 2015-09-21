import React from 'react'
import {Router} from 'react-router'
import {history} from 'react-router/lib/BrowserHistory'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {fromJS} from 'immutable'

import reducers from '../shared/reducers'
import routes from '../shared/routes'

import './css/index.styl'

const initial_state = window.__INITIAL_STATE__

Object.keys(initial_state).forEach(key => {initial_state[key] = fromJS(initial_state[key])})

const reducer = combineReducers(reducers)
const store = createStore(reducer, initial_state)

React.render(
  <Provider store={store}>
    { () =>
      <Router children={routes} history={history} />
    }
  </Provider>,
  document.getElementById('react-view')
)
