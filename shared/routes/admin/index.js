
class HomeRoute {
  constructor() {
    this.path = 'admin'
  }

  getComponents(location, callback) {
    callback(null, require('./containers/admin'))
  }
}

export default new HomeRoute()
