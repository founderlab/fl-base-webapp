import React from 'react'
import {ReduxRouter} from 'redux-router'
import {render} from 'react-dom'
import createHistory from 'history/lib/createBrowserHistory'
import {Provider} from 'react-redux'
import {reduxReactRouter} from 'redux-router'

// no jQuery, backbone needs an ajax function
const Backbone = require('backbone')
Backbone.ajax = require('fl-backbone.nativeajax')

import createStore from '../shared/createStore'
import {patchRouteEntry} from 'fl-react-utils'

export default (getRoutes) => {

  const initialState = window.__INITIAL_STATE__
  const store = createStore(reduxReactRouter, patchRouteEntry(getRoutes), createHistory, initialState)

  let toRender = (
    <Provider store={store} key="provider">
      <ReduxRouter routes={getRoutes(store)} />
    </Provider>
  )
  if (__DEBUG__) {
    const {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react')
    toRender = (
      <div>
        {toRender}
        <DebugPanel top left bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    )
  }

  render(toRender, document.getElementById('react-view'))

}
