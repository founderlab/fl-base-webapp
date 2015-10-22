
class HomeRoute {
  constructor() {
    this.path = 'home'
  }

  getComponents(location, callback) {
    callback(null, require('./containers/home'))
  }
}

export default new HomeRoute()
