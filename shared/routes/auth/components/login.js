import React from 'react'
import {LoginForm} from 'fl-auth-react'

export default class Login extends React.Component {

  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
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
