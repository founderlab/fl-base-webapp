import React from 'react'
import {connect} from 'react-redux'
import {actions as auth_actions} from 'fl-auth-redux'
import Register from '../components/register'

@connect(state => ({auth: state.auth, config: state.config}))
export default class RegisterContainer extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    config: React.PropTypes.object.isRequired,
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
