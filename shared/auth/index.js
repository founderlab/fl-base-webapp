
export default class Auth {

  static login(email, password, callback) {
    Auth.email = email
    callback()
  }

  static logout(callback) {
    Auth.email = null
    callback()
  }

  static loggedIn() {
    return !!Auth.email
  }

}
