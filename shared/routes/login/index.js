
export default class LoginRoute {
  constructor() {
    this.path = 'login'
  }

  getComponents(location, callback) {
    callback(null, require('./containers/login'))
  }
}

export default new LoginRoute()
