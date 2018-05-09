import _ from 'lodash' // eslint-disable-line
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {push} from 'redux-router'
import {register} from 'fl-auth-redux'
import {saveProfile, loadActiveProfile} from '../actions'
import Register from '../components/Register'


@connect(state => ({
  auth: state.auth,
  profiles: state.profiles,
  router: state.router,
}), {register, loadActiveProfile, saveProfile, push})
export default class RegisterContainer extends React.Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    profiles: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    loadActiveProfile: PropTypes.func.isRequired,
    saveProfile: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  static contextTypes = {
    url: PropTypes.string.isRequired,
  }

  handleSubmit = data => {
    data.email = data.email && data.email.trim()
    this.props.register(`${this.context.url}/register`, data, err => {
      if (err) return console.log(err)

      this.props.loadActiveProfile({user_id: this.props.auth.get('user').get('id')}, err => {
        if (err) return console.log(err)

        const profile = _.extend(this.props.profiles.get('active').toJSON(), data)

        this.props.saveProfile(profile, err => {
          if (err) return console.log(err) // todo: errors
          this.props.push(this.props.router.location.query.returnTo || '/')
        })
      })
    })
  }

  loading = () => this.props.auth.get('loading')

  errorMsg = () => {
    const {auth} = this.props
    const userError = auth.get('errors') && auth.get('errors').get('register')
    if (userError) return userError.toString()
    return ''
  }

  render() {
    const {auth, router} = this.props
    const email = auth.get('user') && auth.get('user').get('email')

    return (
      <div>
        <Helmet title="Profile setup" />
        <Register
          loading={this.loading()}
          errorMsg={this.errorMsg()}

          email={email}
          query={router.location.query}

          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}
