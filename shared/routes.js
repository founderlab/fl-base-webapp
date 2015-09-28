import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/app'
import Landing from './components/landing'
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'

function requireAuth(nextState, replaceState) {
  console.log('requireAuth', nextState)
  // if (!Auth.loggedIn()) {
  //   console.log('requireAuth fail')
  //   replaceState({nextPathname: nextState.location.pathname}, '/login')
  // }
}

export default (
  <Route name="app" component={App} path="/">
    <IndexRoute component={Landing} />
    <Route component={Login} path="login" />
    <Route component={Register} path="register" />
    <Route component={Home} path="home" />
    // <Route component={Home} path="home" onEnter={requireAuth} />
  </Route>
)
