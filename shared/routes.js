import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './routes/app'
import Landing from './routes/landing'
import Home from './routes/home'
import Login from './routes/login'
import Register from './routes/register'

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
