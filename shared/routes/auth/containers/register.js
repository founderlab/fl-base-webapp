import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {actions as auth_actions} from 'fl-auth-redux'
import Register from '../components/register'

@connect(state => _.pick(state, 'auth', 'config'))
export default class RegisterContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    dispatch: PropTypes.func,
    config: PropTypes.object.isRequired,
  }

  onRegister = data => {
    this.props.dispatch(auth_actions.register(`${this.props.config.get('url')}/register`, data.email, data.password, (err) => {
      if (!err) window.location()
    }))
  }

  render() {
    return (
      <Register auth={this.props.auth} onSubmit={this.onRegister} />
    )
  }

}
