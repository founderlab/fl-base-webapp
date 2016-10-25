import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'redux-router'
import {register} from 'fl-auth-redux'
import Register from '../components/Register'

@connect(state => ({auth: state.auth, url: state.config.get('url'), query: state.router.location.query}), {register, push})
export default class RegisterContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  handleSubmit = data => {
    this.props.register(`${this.props.url}/register`, data, err => {
      if (!err) this.props.push(this.props.query.redirectTo || '/')
    })
  }

  render() {
    const {auth} = this.props
    const errorMsg = auth.get('errors') && auth.get('errors').get('register')
    return (
      <Register loading={auth.get('loading')} errorMsg={errorMsg} onSubmit={this.handleSubmit} />
    )
  }

}
