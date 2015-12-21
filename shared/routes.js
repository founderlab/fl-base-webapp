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
  const requireRep = requireUserFn(user => user.get('type') === USER_TYPES.REPRESENTATIVE)

  return (
    <Route path="/" name="app" component={require('./modules/app/containers/App')}>
      <IndexRoute component={require('./modules/app/components/Landing')} />

      <AdminRoute path="/admin" name="admin" onEnter={requireAdmin} />

      {UserRoutes}

      <Route path="users">
        <Route onEnter={requireRep}>
          <Route path="profile" component={require('./modules/users/containers/Profile')} />
        </Route>
      </Route>

    </Route>
  )
}
