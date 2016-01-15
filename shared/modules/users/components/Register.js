import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {RegisterForm} from 'fl-auth-react'

export default class Register extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    return (
      <section id="login">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <h2 className="text-center">Register</h2>
                <RegisterForm onSubmit={this.props.onSubmit} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
