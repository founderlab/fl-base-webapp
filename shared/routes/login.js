import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as auth_actions} from 'fl-auth-react'
import LoginOrRegisterPane from '../components/auth/login_or_register_pane'

@connect((state) => ({auth: state.auth, config: state.config}))
export default class RegisterPage extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  render() {
    const {dispatch} = this.props
    return (
      <LoginOrRegisterPane mode="login" {...bindActionCreators(auth_actions, dispatch)} {...this.props} />
    )
  }

}
