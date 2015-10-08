import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import LoginOrRegisterPane from '../components/login_or_register_pane'
import AuthActions from 'fl-auth/client/actions'

@connect((state) => ({auth: state.auth}))
export default class RegisterPage extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  render() {
    const {auth, dispatch} = this.props
    return (
      <LoginOrRegisterPane mode="register" auth={auth} {...bindActionCreators(AuthActions, dispatch)} />
    )
  }

}
