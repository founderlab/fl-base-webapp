import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {AdminRoute} from 'fl-admin'

export default function getRoutes(store) {

  function requireUserFn(checkFn) {
    return function requireUser(nextState, replace, callback) {
      const {auth} = store.getState()
      const user = auth.get('user')
      if (!user || (checkFn && !checkFn(user))) {
        replace(`/login?redirectTo=${nextState.location.pathname}`)
      }
      callback()
    }
  }

  /**
   * Redirect to another path
   * @param  {string} path - new path to redirect to
   */
  function redirectFn(path) {
    return (nextState, replace, callback) => {
      replace(path)
      callback()
    }
  }

  const requireUser = requireUserFn()
  const requireAdmin = requireUserFn(user => user.get('admin'))

  return (
    <Route path="/" name="app" component={require('./modules/app/containers/App')}>
      <IndexRoute sidebarIfUser component={require('./modules/app/containers/Landing')} />

      <AdminRoute hideNav hideFooter path="/admin" name="admin" onEnter={requireAdmin} />

      <Route path="register" component={require('./modules/users/containers/Register')} />
      <Route path="login" component={require('./modules/users/containers/Login')} />
      <Route path="reset-request" component={require('./modules/users/containers/ResetRequest')} />
      <Route path="reset" component={require('./modules/users/containers/Reset')} />
      <Route path="confirm-email" component={require('./modules/users/containers/EmailConfirm')} />
      <Route path="contact" component={require('./modules/app/containers/Contact')} />
      <Route path="privacy" component={require('./modules/app/components/Privacy')} />
      <Route path="terms" component={require('./modules/app/components/Terms')} />
      <Route path="faq" component={require('./modules/app/containers/Faq')} />

      <Route path="/p/:slug" component={require('./modules/app/containers/StaticPage')} />
    </Route>
  )
}
