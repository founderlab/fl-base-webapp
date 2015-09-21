import React from 'react'
import {Route} from 'react-router'
import App from './components/app'
import Home from './components/home'

export default (
  <Route name="app" component={App} path="/">
    <Route component={Home} path="home" />
  </Route>
)
