import React from 'react'
import {LoginForm} from 'fl-auth-react'

export default class Login extends React.Component {

  static propTypes = {
    login: React.PropTypes.func.isRequired,
    config: React.PropTypes.object.isRequired,
  }

  onLogin = data => {
    this.props.login(`${this.props.config.get('url')}/login`, data.email, data.password)
  }

  render() {
    return (
      <LoginForm onSubmit={this.onLogin} {...this.props} />
    )
  }

}
