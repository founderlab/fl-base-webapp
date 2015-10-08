import React from 'react'
import LoginForm from 'fl-auth/client/components/login/form'
import RegisterForm from 'fl-auth/client/components/register/form'

export default class LoginOrRegisterPane extends React.Component {

  static propTypes = {
    mode: React.PropTypes.string,
    login: React.PropTypes.func.isRequired,
    register: React.PropTypes.func.isRequired,
  }

  onRegister = data => { this.props.register(data.email, data.password) }
  onLogin = data => { this.props.register(data.email, data.password) }

  render() {
    return (

      <section id={this.props.mode}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <h2 className="text-center">{this.props.mode}</h2>

              {this.props.mode === 'register' ? (
                <RegisterForm onSubmit={this.onRegister} {...this.props} />
              ) : (
                <LoginForm onSubmit={this.onLogin} {...this.props} />
              )}

            </div>
          </div>
        </div>
      </section>

    )
  }

}
