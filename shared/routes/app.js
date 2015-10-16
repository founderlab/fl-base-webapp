import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import AuthActions from 'fl-auth/lib/client/actions'
import NavBar from '../components/navbar'

@connect((state) => ({auth: state.auth}))
export default class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    auth: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  }

  render() {
    const {auth, dispatch} = this.props

    return (
      <div id="app-view">
        <NavBar auth={auth} {...bindActionCreators(AuthActions, dispatch)} />
        {this.props.children}
      </div>
    )
  }
}
