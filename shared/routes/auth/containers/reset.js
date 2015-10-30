import React from 'react'
import {connect} from 'react-redux'
import {actions as auth_actions} from 'fl-auth-redux'
import Reset from '../components/reset'

@connect((state) => ({auth: state.auth, config: state.config}))
export default class ResetContainer extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    config: React.PropTypes.object.isRequired,
  }

  onReset = data => {
    this.props.dispatch(auth_actions.reset(`${this.props.config.get('url')}/reset_request`, data.email))
  }

  render() {
    return (
      <Reset auth={this.props.auth} onSubmit={this.onReset} />
    )
  }

}
