import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import {register} from 'fl-auth-redux'
import Register from '../components/Register'

@connect(state => ({auth: state.auth, url: state.config.get('url'), query: state.router.location.query}), {register, pushState})
export default class RegisterContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  }

  handleSubmit = data => {
    this.props.register(`${this.props.url}/register`, data, err => {
      if (!err) this.props.pushState(null, this.props.query.redirectTo || '/')
    })
  }

  render() {
    return (
      <Register auth={this.props.auth} onSubmit={this.handleSubmit} />
    )
  }

}
