import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {save} from '../profileActions'
import Profile from '../components/Profile'

@connect(state => ({profiles: state.profiles}), {save})
export default class ProfileContainer extends Component {

  static propTypes = {
    profiles: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
  }

  handleSubmit = data => {
    this.props.save(data, err => {
      console.log('saved', err)
    })
  }

  render() {
    const profileIm = this.props.profiles.get('active')
    if (!profileIm) return null

    return (
      <Profile profile={profileIm.toJSON()} onSubmit={this.handleSubmit} />
    )
  }

}
