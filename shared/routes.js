import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {AdminRoute} from 'fl-admin'
import UserRoutes from './modules/users/routes'
import USER_TYPES from './consts/user_types'

export default function getRoutes(store) {

  function requireUserFn(checkFn) {
    return function requireUser(next_state, replaceState, callback) {
      const {auth} = store.getState()
      if (!auth.get('email') || (checkFn && !checkFn(auth))) {
        replaceState(null, `/login?redirect_to=${next_state.location.pathname}`)
      }
      callback()
    }
  }

  const requireAdmin = requireUserFn(auth => auth.get('admin'))
  const requireRep = requireUserFn(auth => auth.get('type') === USER_TYPES.REPRESENTATIVE)

  return (
    <Route path="/" name="app" component={require('./modules/app/containers/App')}>
      <IndexRoute component={require('./modules/app/components/Landing')} />

      <AdminRoute path="/admin" name="admin" onEnter={requireAdmin} />

      {UserRoutes}

      <Route path="opportunities">
        <IndexRoute component={require('./modules/opportunities/containers/OpportunityFinder')} />
        <Route path=":id" component={require('./modules/opportunities/containers/OpportunityDetail')} />
        <Route path=":id/apply" component={require('./modules/opportunities/containers/OpportunityApply')} />
      </Route>

      <Route path="users">
        <Route component={require('./modules/users/containers/Register')} path="register" />
        <Route onEnter={requireRep}>
          <Route path="profile" component={require('./modules/users/containers/Profile')} />
        </Route>
      </Route>

    </Route>
  )
}
