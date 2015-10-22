
export default class LoginRoute {
  constructor() {
    this.path = '/register'
  }

  getComponents(location, callback) {
    callback(null, require('./containers/register'))
  }
}
