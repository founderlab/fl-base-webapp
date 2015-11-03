import _ from 'lodash'
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {actions as auth_actions} from 'fl-auth-redux'
import ResetRequest from '../components/reset_request'

@connect(state => _.pick(state, 'auth', 'config'), {reset: auth_actions.reset})
export default class ResetRequestContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
  }

  onReset = data => {
    this.props.reset(`${this.props.config.get('url')}/reset_request`, data.email)
  }

  render() {
    return (
      <ResetRequest auth={this.props.auth} onSubmit={this.onReset}/>
    )
  }

}
