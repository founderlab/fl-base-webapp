import _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {actions as auth_actions} from 'fl-auth-redux'
import ResetRequest from '../components/reset_request'

@connect(state => _.pick(state, 'auth', 'config'))
export default class ResetRequestContainer extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    auth: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired,
  }

  onReset = data => {
    this.props.dispatch(auth_actions.reset(`${this.props.config.get('url')}/reset_request`, data.email))
  }

  render() {
    return (
      <ResetRequest auth={this.props.auth} onSubmit={this.onReset}/>
    )
  }

}
