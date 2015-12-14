
// export default class LoginRoute {
//   constructor() {
//     this.path = 'login'
//   }

//   getComponents(location, callback) {
//     callback(null, require('./containers/reset'))
//   }

//   getChildRoutes(location, callback) {
//     console.log('getchild', location)
//     callback(null, [{
//       path: 'reset',
//       getComponents: (location, callback) => callback(null, require('./containers/login')),
//     }])
//   }

// }

// export default new LoginRoute()


import React from 'react'
import {Route} from 'react-router'

export default (
  <Route>
    <Route component={require('./containers/Login')} path="login" />

    <Route component={require('./containers/ResetRequest')} path="reset_request" />
    <Route component={require('./containers/Reset')} path="reset" />
    <Route component={require('./containers/EmailConfirm')} path="confirm_email" />
  </Route>
)
