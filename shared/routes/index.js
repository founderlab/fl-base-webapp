// import AppRoute from './app'
// export default AppRoute

import React from 'react'
import {Route, IndexRoute} from 'react-router'

export default (
  <Route name="app" component={require('./app/containers/app')} path="/">
    <IndexRoute component={require('./app/components/landing')} />

    {require('./auth')}
    {require('./admin')}

    <Route component={require('./home/containers/home')} path="home" />

  </Route>
)
