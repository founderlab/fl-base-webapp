import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import {register} from 'fl-auth-redux'
import Register from '../components/register'

@connect(state => _.extend(_.pick(state, 'auth', 'config'), {query: state.router.location.query}), {register, pushState})
export default class RegisterContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  }

  onRegister = data => {
    this.props.register(`${this.props.config.get('url')}/register`, data.email, data.password, (err) => {
      if (!err) this.props.pushState(null, this.props.query.redirect_to || '/')
    })
  }

  render() {
    return (
      <Register auth={this.props.auth} onSubmit={this.onRegister} />
    )
  }

}
