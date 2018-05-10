import React from 'react'
import moment from 'moment'
// import {ReduxRouter, reduxReactRouter} from 'redux-router'
import { BrowserRouter, Link, Route } from 'react-router-dom'

//todo: replace later, react 16 messes with hot loading
// import {hydrate} from 'react-dom'
import {render as hydrate} from 'react-dom'
//

// import createHistory from 'history/lib/createBrowserHistory'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'

import {Provider} from 'react-redux'
import LogRocket from 'logrocket'
// import { patchRouteEntry } from 'fl-react-utils'
import createStore from '../shared/createStore'
import { renderRoutes } from 'react-router-config'
// import App from '../shared/modules/app/containers/App'
// import {AdminRoute} from 'fl-admin'


// Set moment locale to aus
moment.locale('en-AU')

// no jQuery, backbone needs an ajax function
const Backbone = require('backbone')
Backbone.ajax = require('fl-backbone.nativeajax')


export default function(getRoutes) {
  const initialState = window.__INITIAL_STATE__

  if (process.env.NODE_ENV === 'production' && initialState.config.logRocketId) {
    LogRocket.init(initialState.config.logRocketId)

    if (typeof mixpanel !== 'undefined' && initialState.auth.user && initialState.profiles.active) {
      mixpanel.identify(initialState.auth.user.id)
      const info = {
        $name: initialState.profiles.active.displayName,
        $first_name: initialState.profiles.active.firstName,
        $last_name: initialState.profiles.active.lastName,
        $created: initialState.auth.user.createdDate,
        $email: initialState.auth.user.email || initialState.profiles.active.contactEmail,
      }
      mixpanel.people.set(info)
    }
  }

  // const store = createStore(reduxReactRouter, patchRouteEntry(getRoutes), createHistory, initialState)
  const history = createHistory()
  const store = createStore({initialState, history})

  //TODO: Remove or make development only
  const ele = document.getElementById('react-view')
  ele.innerHTML = ''
  // /TODO

  // const requireAdmin = () => true

  hydrate((
    <Provider store={store} key="provider">
      <ConnectedRouter history={history}>
        {renderRoutes(getRoutes())}
      </ConnectedRouter>
    </Provider>
  ), ele)
}

        // <div>
          // {/*<AdminRoute path="/admin" name="admin" onEnter={requireAdmin} />*/}
          // <Route path="*" name="app" component={App} routes={getRoutes()} />
        // </div>
 // routes={getRoutes(store)} />