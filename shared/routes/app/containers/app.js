import React, {Component, PropTypes} from 'react'
import NavBar from './navbar'

export default class App extends Component {

  static propTypes = {
    children: PropTypes.node,
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
