import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {push} from 'redux-router'
import {reset} from 'fl-auth-redux'
import Reset from '../components/Reset'

@connect(state => _.extend(_.pick(state, 'auth', 'config'), {query: state.router.location.query}), {reset, push})
export default class ResetContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    config: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  onReset = data => {
    this.props.reset(`${this.props.config.get('url')}/reset`, data.email && data.email.trim(), data.password, data.resetToken, err => {
      if (!err) window.location.href = this.props.query.redirectTo || '/profile'
    })
  }

  render() {
    return (
      <div>
        <Helmet title="Reset your password" />
        <Reset loading={this.props.auth.get('loading')} auth={this.props.auth} email={this.props.query.email} resetToken={this.props.query.resetToken} onSubmit={this.onReset} />
      </div>
    )
  }
}
