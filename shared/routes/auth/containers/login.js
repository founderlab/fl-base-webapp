import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import {actions as auth_actions} from 'fl-auth-redux'
import Login from '../components/login'

@connect(state => _.pick(state, 'auth', 'config'), {pushState, login: auth_actions.login})
export default class LoginContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
  }

  onLogin = data => {
    this.props.login(`${this.props.config.get('url')}/login`, data.email, data.password, (err) => {
      if (!err) console.log('redirect::')
    })
  }

  render() {
    return (
      <Login auth={this.props.auth} onSubmit={this.onLogin} />
    )
  }

}
