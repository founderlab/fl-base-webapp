import React from 'react'
import {connect} from 'react-redux'
import {actions as auth_actions} from 'fl-auth-react'
import Login from '../components/login'

@connect((state) => ({auth: state.auth, config: state.config}))
export default class LoginContainer extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    config: React.PropTypes.object.isRequired,
  }

  onLogin = data => {
    this.props.dispatch(auth_actions.login(`${this.props.config.get('url')}/login`, data.email, data.password))
  }

  render() {
    return (
      <Login auth={this.props.auth} onSubmit={this.onLogin} />
    )
  }

}
