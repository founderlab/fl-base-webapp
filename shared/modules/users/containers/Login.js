import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'redux-router'
import {login} from 'fl-auth-redux'
import Login from '../components/Login'

@connect(state => _.extend(_.pick(state, 'auth', 'config'), {query: state.router.location.query}), {push, login})
export default class LoginContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  onLogin = data => {
    this.props.login(`${this.props.config.get('url')}/login`, data.email, data.password, err => {
      if (err) return console.log(err)
      // Full reload if we're heading to the admin site
      if (this.props.query.redirectTo && this.props.query.redirectTo.match(/^\/admin/)) {
        window.location.href = this.props.query.redirectTo
      }
      else {
        this.props.push(this.props.query.redirectTo || '/')
      }
    })
  }

  render() {
    const {auth} = this.props
    const errorMsg = auth.get('errors') && auth.get('errors').get('login')
    return (
      <Login loading={auth.get('loading')} errorMsg={errorMsg} onSubmit={this.onLogin} />
    )
  }

}
