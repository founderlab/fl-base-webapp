import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import {reset} from 'fl-auth-redux'
import Reset from '../components/Reset'

@connect(state => _.extend(_.pick(state, 'auth', 'config'), {query: state.router.location.query}), {reset, pushState})
export default class ResetContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    config: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  }

  onReset = data => {
    this.props.reset(`${this.props.config.get('url')}/reset`, data.email, data.password, data.resetToken, err => {
      if (!err) this.props.pushState(null, this.props.query.redirectTo || '/')
    })
  }

  render() {
    return (
      <Reset auth={this.props.auth} email={this.props.query.email} resetToken={this.props.query.resetToken} onSubmit={this.onReset} />
    )
  }
}
