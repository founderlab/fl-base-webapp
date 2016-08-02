import React from 'react'
import {Route} from 'react-router'

export default (
  <Route>
    <Route component={require('./containers/Login')} path="login" />
    <Route component={require('./containers/Register')} path="register" />
    <Route component={require('./containers/ResetRequest')} path="reset-request" />
    <Route component={require('./containers/Reset')} path="reset" />
    <Route component={require('./containers/EmailConfirm')} path="confirm-email" />
  </Route>
)
