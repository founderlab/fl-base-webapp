import React from 'react'
import Login from './login'
import Register from './register'

export default class LoginOrRegisterPane extends React.Component {

  static propTypes = {
    mode: React.PropTypes.oneOf(['login', 'register']),
  }

  render() {
    return (

      <section id={this.props.mode}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <h2 className="text-center">{this.props.mode}</h2>

              {this.props.mode === 'register' ? (
                <Register {...this.props} />
              ) : (
                <Login {...this.props} />
              )}

            </div>
          </div>
        </div>
      </section>

    )
  }

}
