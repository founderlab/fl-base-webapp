import React from 'react'
import {Button, Input} from 'react-bootstrap'
import auth from '../../auth'

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.onSubmit}>

        <Input
          onChange={this.onNameChange}
          type="text"
          value={this.state.email}
          placeholder="email"
          // label="email"
          bsStyle={this.validationState()} />
        <Input
          onChange={this.onPasswordChange}
          type="text"
          value={this.state.password}
          placeholder="password"
          // label="password"
          bsStyle={this.validationState()} />

        <Button onClick={this.onSubmit} bsStyle="primary" >Login</Button>

        <span>loading: {this.props.loading}</span>
        <span>it works: {this.props.login.get('email')}</span>

      </form>
    )
  }

  validationState() {
    return null
  }

  onSubmit = (e) => {
    e.preventDefault()
    auth.login(this.state.email, this.state.password, (err) => {
      if (err) console.log(err)
      this.props.submitLogin(this.state.email)
    })
  }
  onNameChange = (e) => {
    this.state.email = e.target.value
  }
  onPasswordChange = (e) => {
    this.state.password = e.target.value
  }
}


