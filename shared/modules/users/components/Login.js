import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {LoginForm} from 'fl-auth-react'

export default class Login extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    return (
      <section id="login">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <h2 className="text-center">Login</h2>
              <LoginForm {...this.props} />

              <br /><Link to="/users/register">Register as a student</Link>
              <br /><Link to="/reset-request">Forgot?</Link>

            </div>
          </div>
        </div>
      </section>
    )
  }
}

// <br /><Link to="/auth/facebook">Login with Facebook</Link>
