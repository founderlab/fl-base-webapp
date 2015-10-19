import React from 'react'
import RegisterForm from 'fl-auth/lib/client/components/register_form'

export default class Register extends React.Component {

  static propTypes = {
    register: React.PropTypes.func.isRequired,
    config: React.PropTypes.object.isRequired,
  }

  onRegister = data => {
    this.props.register(`${this.props.config.get('url')}/register`, data.email, data.password)
  }

  render() {
    return (
      <RegisterForm onSubmit={this.onRegister} {...this.props} />
    )
  }

}
