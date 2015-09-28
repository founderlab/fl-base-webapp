import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Register from 'fl-auth/client/components/register'

import AuthActions from '../actions/auth'

@connect((state) => ({auth: state.auth}))
export default class RegisterPage extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    dispatch: React.PropTypes.function,
  }

  render() {
    const {auth, dispatch} = this.props

    return (

      <section id="register">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <h2 className="text-center">Register</h2>
              <Register auth={auth} {...bindActionCreators(AuthActions, dispatch)} />
            </div>
          </div>
        </div>
      </section>

    )
  }

}
