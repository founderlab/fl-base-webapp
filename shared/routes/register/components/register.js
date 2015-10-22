import React from 'react'
import {RegisterForm} from 'fl-auth-react'

export default class Register extends React.Component {

  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <section id="login">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <h2 className="text-center">Register</h2>
                <RegisterForm {...this.props} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
