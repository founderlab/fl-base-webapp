import React from 'react'
import {LoginForm, RegisterForm} from 'fl-auth-react'

export default class LoginOrRegisterPane extends React.Component {

  static propTypes = {
    mode: React.PropTypes.oneOf(['login', 'register']),
    onSubmit: React.PropTypes.func.isRequired,
  }

  render() {
    console.log('this.props', this.props)
    return (
      <section id={this.props.mode}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <h2 className="text-center">{this.props.mode}</h2>

              {this.props.mode === 'register' ? (
                <RegisterForm {...this.props} />
              ) : (
                <LoginForm {...this.props} />
              )}

            </div>
          </div>
        </div>
      </section>
    )
  }
}
