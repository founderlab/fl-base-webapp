import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Dashboard from '../components/dashboard'

@connect(state => ({auth: state.auth}))
export default class Home extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  }

  render() {
    const {auth, dispatch} = this.props
    const logged_in = !!auth.get('user')

    return (
      <Dashboard />
    )
  }
}

