import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {AdminRoute} from 'fl-admin'
import UserRoutes from './modules/users/routes'
import USER_TYPES from './consts/user_types'

export default function getRoutes(store) {

  function requireUserFn(checkFn) {
    return function requireUser(next_state, replaceState, callback) {
      const {auth} = store.getState()
      const user = auth.get('user')
      if (!user || (checkFn && !checkFn(user))) {
        replaceState(null, `/login?redirect_to=${next_state.location.pathname}`)
      }
      callback()
    }
  }

  const requireAdmin = requireUserFn(user => user.get('admin'))

  return (
    <Route path="/" name="app" component={require('./modules/app/containers/App')}>
      <IndexRoute component={require('./modules/app/containers/Landing')} />

      <AdminRoute path="/admin" name="admin" onEnter={requireAdmin} />

      {UserRoutes}

      <Route path="users">
        <Route>
          <Route path="profile" component={require('./modules/users/containers/Profile')} />
        </Route>
      </Route>

    </Route>
  )
}
