import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {actions as auth_actions} from 'fl-auth-redux'
import {LoginForm} from 'fl-auth-react'

@connect(state => _.pick(state, 'auth', 'config'), {login: auth_actions.login})
export default class NavBar extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
  }

  onLogin = data => {
    this.props.login(`${this.props.config.get('url')}/login`, data.email, data.password, (err) => {
      if (!err) console.log('reddd')
    })
  }

  render() {
    const email = this.props.auth.get('email')

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
            <a className="navbar-brand page-scroll" href="/#page-top">FounderLab_replaceme</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a className="page-scroll" href="#about">About</a>
              </li>
              <li>
                {email ? (
                  <span>
                    {email}
                    <a href="/logout" className="btn btn-small">logout</a>
                  </span>
                ) : (
                  <LoginForm mode="horizontal" onSubmit={this.onLogin} {...this.props} />
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
