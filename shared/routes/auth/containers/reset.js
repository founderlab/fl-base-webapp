import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {actions as auth_actions} from 'fl-auth-redux'
import Reset from '../components/reset'

@connect(state => _.pick(state, 'auth', 'config', 'query'))
export default class ResetContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    dispatch: PropTypes.func,
    config: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
  }

  //TODO: still need a good redirect plan
  onReset = data => {
    console.log('data', data)
    this.props.dispatch(auth_actions.reset(`${this.props.config.get('url')}/reset`, data.email, data.password, data.reset_token, (err) => {
      if (!err) window.location.href = '/'
    }))
  }

  render() {
    return (
      <Reset auth={this.props.auth} query={this.props.query} onSubmit={this.onReset} />
    )
  }

}
