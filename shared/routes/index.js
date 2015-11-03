// import AppRoute from './app'
// export default AppRoute

import React from 'react'
import {Route, IndexRoute} from 'react-router'

export default function getRoutes(store) {

  // function requireLogin(nextState, replaceState, cb) {
  //   function checkAuth() {
  //     const { auth: { user }} = store.getState()
  //     if (!user) {
  //       // oops, not logged in, so can't be here!
  //       replaceState(null, '/')
  //     }
  //     cb()
  //   }

  //   if (!isAuthLoaded(store.getState())) {
  //     store.dispatch(loadAuth()).then(checkAuth)
  //   }
  //   else {
  //     checkAuth()
  //   }
  // }

  return (
    <Route name="app" component={require('./app/containers/app')} path="/">
      <IndexRoute component={require('./app/components/landing')} />

      {require('./auth')}
      {require('./admin')}

      <Route component={require('./home/containers/home')} path="home" />

    </Route>
  )
}
