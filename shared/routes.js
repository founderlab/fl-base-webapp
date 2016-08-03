import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {AdminRoute} from 'fl-admin'

export default function getRoutes(store) {

  function requireUserFn(checkFn) {
    return function requireUser(nextState, replaceState, callback) {
      const {auth} = store.getState()
      const user = auth.get('user')
      if (!user || (checkFn && !checkFn(user))) {
        replaceState(null, `/login?redirectTo=${nextState.location.pathname}`)
      }
      callback()
    }
  }

  const requireUser = requireUserFn()
  const requireAdmin = requireUserFn(user => user.get('admin'))

  return (
    <Route path="/" name="app" component={require('./modules/app/containers/App')}>
      <IndexRoute component={require('./modules/app/components/Landing')} />

      <AdminRoute path="/admin" name="admin" onEnter={requireAdmin} />

      <Route path="login" component={require('./modules/users/containers/Login')} />
      <Route path="register" component={require('./modules/users/containers/Register')} />
      <Route path="reset-request" component={require('./modules/users/containers/ResetRequest')} />
      <Route path="reset" component={require('./modules/users/containers/Reset')} />
      <Route path="confirm-email" component={require('./modules/users/containers/EmailConfirm')} />

      <Route path="profile" onEnter={requireUser} component={require('./modules/users/containers/Profile')} />

      <Route path=":slug" component={require('./modules/app/containers/StaticPage')} />

    </Route>
  )
}
