import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {save} from '../profile_actions'
import Profile from '../components/Profile'

@connect(state => ({auth: state.auth}), {save})
export default class ProfileContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
  }

  handleSubmit = data => {
    this.props.save(data, (err) => {
      console.log('saved', err)
    })
  }

  render() {
    const {user} = this.props.auth
    return (
      <Profile user={user} onSubmit={this.handleSubmit} />
    )
  }

}
