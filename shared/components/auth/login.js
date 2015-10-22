import React from 'react'
import {LoginForm} from 'fl-auth-react'

export default class Login extends React.Component {

  static propTypes = {
    onLogin: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <LoginForm onSubmit={this.props.onLogin} {...this.props} />
    )
  }

}
