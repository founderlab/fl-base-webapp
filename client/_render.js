import React from 'react'
import moment from 'moment'
import {ReduxRouter, reduxReactRouter} from 'redux-router'

//todo: replace later, react 16 messes with hot loading
// import {hydrate} from 'react-dom'
import {render as hydrate} from 'react-dom'
//
//tmp
import {renderToString} from 'react-dom/server'
import {Route, Router, IndexRoute} from 'react-router'
//

import createHistory from 'history/lib/createBrowserHistory'
import {Provider} from 'react-redux'
import {patchRouteEntry} from 'fl-react-utils'
import LogRocket from 'logrocket'
import createStore from '../shared/createStore'

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

  const store = createStore(reduxReactRouter, patchRouteEntry(getRoutes), createHistory, initialState)

  //TODO: Remove or make development only
  const ele = document.getElementById('react-view')
  ele.innerHTML = ''
  // /TODO


  console.log('wtf', renderToString(
    <Provider store={store} key="provider">
      <Router history={createHistory()}>
        <Route path="/" name="app" component={renderTestPage} />
      </Router>
    </Provider>)
  )
  console.log('render')

  hydrate((
    <Provider store={store} key="provider">
      <ReduxRouter routes={getRoutes(store)} />
    </Provider>
  ), ele)
}

      // <ReduxRouter routes={() => <Route path="/" name="app" component={renderTestPage} />} />
    // <Provider store={store} key="provider">
      // <ReduxRouter routes={getRoutes(store)} />
    // </Provider>

function renderTestPage() {
  return <div>TESTPAGE</div>
}
