import React from 'react'
// import {Route, IndexRoute} from 'react-router'
// import App from './routes/app'
// import Landing from './routes/landing'
// import Home from './routes/home'
// import Login from './routes/login'
// import Register from './routes/register'

// function requireAuth(nextState, replaceState) {
//   console.log('requireAuth', nextState)
  // if (!Auth.loggedIn()) {
  //   console.log('requireAuth fail')
  //   replaceState({nextPathname: nextState.location.pathname}, '/login')
  // }
// }
export default class AppRoute extends React.Component {
  constructor() {
    super()
    this.path = '/'
  }

  getChildRoutes(location, callback) {
    callback(null, [
      require('../login'),
      require('../register'),
      require('../home'),
    ])
  }

  getIndexRoute(location, callback) {
    callback(null, require('./components/landing'))
  }

  getComponents(location, callback) {
    callback(null, require('./containers/app'))
  }
}


  // <Route name="app" component={App} path="/">
  //   <IndexRoute component={Landing} />
  //   <Route component={Login} path="login" />
  //   <Route component={Register} path="register" />
  //   <Route component={Home} path="home" />
  //   // <Route component={Home} path="home" onEnter={requireAuth} />
  // </Route>
