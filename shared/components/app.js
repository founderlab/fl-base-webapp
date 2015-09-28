import React from 'react'
import NavBar from './navbar'

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div id="app-view">
        <NavBar />
        {this.props.children}
      </div>
    )
  }
}
