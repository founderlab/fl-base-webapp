import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Queue from 'queue-async'
import {connect} from 'react-redux'
import {push} from 'redux-router'
import {register} from 'fl-auth-redux'
import RegisterModal from '../components/RegisterModal'

@connect(state => ({
  auth: state.auth,
  profiles: state.profiles,
  query: state.router.location.query,
}), {register, push})
export default class RegisterContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
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
      this.props.push('/')
    })
  }

  render() {
    const {auth, profiles, query} = this.props
    const loading = auth.get('loading') || profiles.get('loading') || this.state.loading

    let errorMsg = ''
    if (this.state.errorMsg) errorMsg = this.state.errorMsg
    else if (auth.get('errors')) errorMsg = auth.get('errors').get('register')
    else if (profiles.get('errors')) errorMsg = profiles.get('errors').get('save')

    return (
      <RegisterModal
        loading={loading}
        initialValues={{email: query.email}}
        errorMsg={errorMsg && errorMsg.toString()}
        onSubmit={this.handleSubmit}
        {...this.props}
      />
    )
  }
}