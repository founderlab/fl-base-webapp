import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import {confirmEmail} from 'fl-auth-redux'
import EmailConfirm from '../components/EmailConfirm'

@connect(state => _.extend(_.pick(state, 'auth', 'config'), {query: state.router.location.query}), {confirmEmail, pushState})
export default class EmailConfirmContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    config: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    confirmEmail: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  }

  confirmEmail = (email, token) => {
    this.props.confirmEmail(`${this.props.config.get('url')}/confirm_email`, email, token)
  }

  render() {
    return (
      <EmailConfirm auth={this.props.auth} email={this.props.query.email} token={this.props.query.token} confirmEmail={this.confirmEmail} />
    )
  }
}
