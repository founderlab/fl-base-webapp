import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import LoginActions from '../../actions/login'
import Login from '../login'

@connect((state) => ({login: state.login}))
export default class NavBar extends React.Component {

  render() {
    const {login, dispatch} = this.props

    return (
      <nav id="mainNav" className="navbar navbar-default navbar-fixed-top affix">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand page-scroll" href="#page-top">FounderLab_replaceme</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a className="page-scroll" href="#about">About</a>
              </li>
              <li>
                <Login login={login} {...bindActionCreators(LoginActions, dispatch)} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
