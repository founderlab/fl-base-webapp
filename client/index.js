import React from 'react'
import {Router} from 'react-router'
import {render} from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {Provider} from 'react-redux'

import routes from '../shared/routes'
import createStore from '../shared/lib/create_store'
import './css/index.styl'

const history = createBrowserHistory()

const initial_state = window.__INITIAL_STATE__
const store = createStore(initial_state)

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
