
export default class RegisterRoute {
  constructor() {
    this.path = 'register'
  }

  getComponents(location, callback) {
    callback(null, require('./containers/register'))
  }
}

export default new RegisterRoute()
