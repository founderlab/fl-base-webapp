
export default class LoginRoute {
  constructor() {
    this.path = '/home'
  }

  getComponents(location, callback) {
    callback(null, require('./containers/home'))
  }
}
