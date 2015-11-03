import React, {Component, PropTypes} from 'react'
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
            </div>
          </div>
        </div>
      </section>
    )
  }
}
