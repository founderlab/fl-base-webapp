import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import {login} from 'fl-auth-redux'
import {LoginForm} from 'fl-auth-react'

@connect(state => _.extend(_.pick(state, 'auth', 'config'), {query: state.router.location.query}), {login, pushState})
export default class NavBar extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  }

  onLogin = data => {
    this.props.login(`${this.props.config.get('url')}/login`, data.email, data.password, (err) => {
      if (!err) this.props.pushState(null, this.props.query.redirect_to || '/')
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
            <Link to="/#page-top" className="navbar-brand page-scroll">FounderLab_replaceme</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/#about" className="page-scroll">About</Link>
              </li>
              <li>
                {email ? (
                  <span>
                    {email}
                    <a href="/logout" className="btn btn-small">logout</a>
                  </span>
                ) : (
                  <div>
                    <LoginForm mode="horizontal" onSubmit={this.onLogin} {...this.props} />
                    <br /><Link to="/auth/facebook">Login with Facebook</Link>
                    <br /><Link to="/register">Register</Link>
                    <br /><Link to="/reset_request">Forgot?</Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
