import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {routeActions} from 'redux-simple-router'
import {confirmEmail} from 'fl-auth-redux'
import EmailConfirm from '../components/EmailConfirm'

@connect(state => _.pick(state, 'auth', 'config'), {confirmEmail, pushState: routeActions.push})
export default class EmailConfirmContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    config: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    confirmEmail: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  }

  confirmEmail = (email, token) => {
    this.props.confirmEmail(`${this.props.config.get('url')}/confirm_email`, email, token)
  }

  render() {
    const {email, token} = this.props.location.query
    return (
      <EmailConfirm auth={this.props.auth} email={email} token={token} confirmEmail={this.confirmEmail} />
    )
  }
}
