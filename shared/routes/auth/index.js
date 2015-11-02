
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
    <Route getComponents={(location, callback) => callback(null, require('./containers/login'))} path="login" />

    <Route component={require('./containers/reset_request')} path="reset_request" />
    <Route component={require('./containers/reset')} path="reset" />
    <Route component={require('./containers/register')} path="register" />
  </Route>
)
