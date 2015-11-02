
// class AdminRoute {
//   constructor() {
//     this.path = 'admin'
//   }

//   getComponents(location, callback) {
//     console.log('admin requested')
//     require.ensure(['./containers/admin'], (require) => {
//       console.log('admin loaded')
//       const Admin = require('./containers/admin')
//       console.log(Admin)
//       callback(null, require('./containers/admin'))
//     })
//   }
// }

// export default new AdminRoute()

import React from 'react'
import {Route} from 'react-router'

// require.ensure = require.ensure || ((d, c) => c(require))
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default (
  <Route
    path="admin"
    getComponents={(location, callback) => {
      console.log('admin requested')
      require.ensure(['./containers/admin'], (require) => {
        console.log('admin loaded')
        const Admin = require('./containers/admin')
        console.log(Admin)
        callback(null, require('./containers/admin'))
      })
    }} />
)
