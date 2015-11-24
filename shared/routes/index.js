import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {AdminRoute} from 'fl-admin'
import AuthRoutes from './auth/routes'

export default function getRoutes(store) {

  function requireAdmin(nextState, replaceState, callback) {
    const {auth} = store.getState()
    if (!auth.get('email') || !auth.get('admin')) {
      console.log('Not an admin:', auth.get('email'), auth.get('admin'))
      // replaceState(null, '/')
    }
    callback()
  }

  function requireLogin(nextState, replaceState, callback) {
    const {auth} = store.getState()
    if (!auth.get('email')) {
      replaceState(null, '/')
    }
    callback()
  }

  return (
    <Route path="/" name="app" component={require('./app/containers/app')}>
      <IndexRoute component={require('./app/components/landing')} />

      <AdminRoute path="/admin" name="admin" onEnter={requireAdmin} />

      {AuthRoutes}

      <Route onEnter={requireLogin}>
        <Route path="home" component={require('./home/containers/home')} />
      </Route>

    </Route>
  )
}
