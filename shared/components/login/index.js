import React from 'react'
import auth from '../../auth'
import LoginView from './view'
import LoginForm from './form'

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      logged_in: auth.loggedIn()
    }
  }

  render() {
    return (
      <div className="login">

        {this.state.logged_in ? (
          <LoginView {...this.props} />
        ) : (
          <LoginForm {...this.props} />
        )}

      </div>
    )
  }
}
