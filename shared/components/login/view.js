import React from 'react'

export default class LoginView extends React.Component {
  render = () => {
    return (
      <div id="email">
        <p>logged in as: {this.props.login.get('email')}</p>
      </div>
    )
  }
}
