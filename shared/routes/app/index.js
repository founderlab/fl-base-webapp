class AppRoute {
  constructor() {
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
    callback(null, {component: require('./components/landing')})
  }

  getComponent(location, callback) {
    callback(null, require('./containers/app'))
  }
}

export default new AppRoute()

  // <Route name="app" component={App} path="/">
  //   <IndexRoute component={Landing} />
  //   <Route component={Login} path="login" />
  //   <Route component={Register} path="register" />
  //   <Route component={Home} path="home" />
  //   // <Route component={Home} path="home" onEnter={requireAuth} />
  // </Route>
