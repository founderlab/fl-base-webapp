import React from 'react'
import {ReduxRouter} from 'redux-router'
import {render} from 'react-dom'
import createHistory from 'history/lib/createBrowserHistory'
import {Provider} from 'react-redux'
import {reduxReactRouter} from 'redux-router'

// no jQuery, backbone needs an ajax function
const Backbone = require('backbone')
Backbone.ajax = require('backbone.nativeajax')

import '../shared/configure_admin'
import createStore from '../shared/create_store'
import patchRouteEntry from '../shared/lib/patch_route_entry'

export default (getRoutes) => {

  const initial_state = window.__INITIAL_STATE__
  const store = createStore(reduxReactRouter, patchRouteEntry(getRoutes), createHistory, initial_state)

  let to_render = (
    <Provider store={store} key="provider">
      <ReduxRouter routes={getRoutes(store)} />
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

}
