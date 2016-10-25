import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {resetRequest} from 'fl-auth-redux'
import ResetRequest from '../components/ResetRequest'

@connect(state => _.extend(_.pick(state, 'auth', 'config'), {email: state.router.location.query.email}), {resetRequest})
export default class ResetRequestContainer extends Component {

  static propTypes = {
    email: PropTypes.string,
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    resetRequest: PropTypes.func.isRequired,
  }

  onReset = data => {
    this.props.resetRequest(`${this.props.config.get('url')}/reset-request`, data.email)
  }

  render() {
    const {auth} = this.props
    const errorMsg = auth.get('errors') && auth.get('errors').get('resetRequest')
    return (
      <ResetRequest
        loading={auth.get('loading')}
        errorMsg={errorMsg}
        email={this.props.email}
        onSubmit={this.onReset}
      />
    )
  }

}
