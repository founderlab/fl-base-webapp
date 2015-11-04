import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import {login} from 'fl-auth-redux'
import Login from '../components/login'

@connect(state => _.extend(_.pick(state, 'auth', 'config'), {query: state.router.location.query}), {pushState, login})
export default class LoginContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  }

  onLogin = data => {
    this.props.login(`${this.props.config.get('url')}/login`, data.email, data.password, (err) => {
      if (!err) this.props.pushState(null, this.props.query.redirect_to || '/')
    })
  }

  render() {
    return (
      <Login auth={this.props.auth} onSubmit={this.onLogin} />
    )
  }

}
