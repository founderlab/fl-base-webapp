import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import LoginOrRegisterPane from '../components/auth/login_or_register_pane'
import AuthActions from 'fl-auth/lib/client/actions'

@connect((state) => ({auth: state.auth, config: state.config}))
export default class RegisterPage extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  render() {
    const {dispatch} = this.props
    return (
      <LoginOrRegisterPane mode="login"{...bindActionCreators(AuthActions, dispatch)} {...this.props} />
    )
  }

}
