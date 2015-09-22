import React from 'react'
import Auth from 'fl-auth-client'
import NavBar from './navbar'
import LandingPage from './landing'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      logged_in: Auth.loggedIn()
    }
  }

  render() {
    return (
      <div id="app-view">
        <NavBar />
        {this.state.logged_in ? (
          this.props.children
        ) : (
          <LandingPage />
        )}
      </div>
    )
  }
}
