import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Queue from 'queue-async'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {push} from 'redux-router'
import {register} from 'fl-auth-redux'
import Register from '../components/Register'

@connect(state => ({
  auth: state.auth,
  subscriptions: state.subscriptions,
  profiles: state.profiles,
  query: state.router.location.query,
}), {register, push})
export default class RegisterContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    subscriptions: PropTypes.object.isRequired,
    profiles: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  static contextTypes = {
    url: PropTypes.string,
  }

  state = {}

  handleSubmit = data => {
    const user = _.pick(data, 'email', 'password')
    const queue = new Queue(1)
    this.setState({errorMsg: '', loading: true})

    // create the user, profile and log them in
    queue.defer(callback => this.props.register(this.context.url, user, callback))

    queue.await(err => {
      if (err) {
        console.log(' error', err)
        return this.setState({errorMsg: err.message || err, loading: false})
      }
      this.props.push('/profile')
    })
  }

  render() {
    const {auth, profiles, subscriptions, query} = this.props
    const loading = subscriptions.get('loading') || auth.get('loading') || profiles.get('loading') || this.state.loading

    let errorMsg = ''
    if (this.state.errorMsg) errorMsg = this.state.errorMsg
    else if (auth.get('errors')) errorMsg = auth.get('errors').get('register')
    else if (subscriptions.get('errors')) errorMsg = subscriptions.get('errors').get('subscriptions')
    else if (profiles.get('errors')) errorMsg = profiles.get('errors').get('save')

    return (
      <div>
        <Helmet>
          <title itemProp="name" lang="en">Migration Agent Listing</title>
          <meta name="description" content="Register for a migration agent profile and get connected with those looking to immigrate to their dream country." />
        </Helmet>
        <Register
          activePlan={query.plan}
          initialValues={{planId: query.plan}}
          loading={loading}
          errorMsg={errorMsg && errorMsg.toString()}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}
