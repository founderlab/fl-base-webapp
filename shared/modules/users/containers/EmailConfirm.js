import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {push} from 'redux-router'
import {confirmEmail} from 'fl-auth-redux'
import EmailConfirm from '../components/EmailConfirm'

@connect(state => _.extend(_.pick(state, 'auth', 'config'), {query: state.router.location.query}), {confirmEmail, push})
export default class EmailConfirmContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    config: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    confirmEmail: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  confirmEmail = (email, token) => {
    this.props.confirmEmail(`${this.props.config.get('url')}/confirm-email`, email, token)
  }

  render() {
    const {auth} = this.props
    const errorMsg = auth.get('errors') && auth.get('errors').get('reset')
    return (
      <div>
        <Helmet title="Confirm your email" />
        <EmailConfirm
          loading={auth.get('loading')}
          emailConfirmed={auth.get('emailConfirmed')}
          errorMsg={errorMsg}
          email={this.props.query.email}
          token={this.props.query.token}
          confirmEmail={this.confirmEmail}
        />
      </div>
    )
  }
}
