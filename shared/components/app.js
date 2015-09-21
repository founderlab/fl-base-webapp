import React from 'react'

import auth from '../auth'

import NavBar from './navbar'
import LandingPage from './landing'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      logged_in: auth.loggedIn()
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
