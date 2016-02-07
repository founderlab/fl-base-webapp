import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import {login} from 'fl-auth-redux'
import {LoginForm} from 'fl-auth-react'
import {NavDropdown} from 'react-bootstrap'
import {APPLICANT} from '../../../consts/user_types'

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
    const user = this.props.auth.get('user')
    let login_display = null

    if (user) {
      login_display = (
        <NavDropdown id="user_dropdown" title={user.get('email')}>
          {user.get('type') === APPLICANT && <li><Link to="/applications">Applications</Link></li>}
          {user.get('admin') && <li><a href="/admin">Admin</a></li>}
          <li><Link to={`/profile`}>Profile</Link></li>
          <li><a href="/logout">Logout</a></li>
        </NavDropdown>
      )
    }
    else {
      login_display = [
        <li key={0}>
          <Link to="/register">Register</Link>
        </li>,
        <li key={1}>
          <LoginForm mode="horizontal" onSubmit={this.onLogin} {...this.props} />
        </li>,
      ]
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top affix">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand page-scroll">site.com</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <ul className="nav navbar-nav">
              <li>
                <Link to="/#">Home</Link>
              </li>
              <NavDropdown id="opportunities_dropdown" title="Opportunities">
                <li><Link to="/opportunities">View Opportunities</Link></li>
              </NavDropdown>
              <NavDropdown id="rep_dropdown" title="Company">
                <li><Link to="/manage/opportunities">Manage Opportunities</Link></li>
                <li><Link to="/manage/opportunities/create">Create Opportunity</Link></li>
              </NavDropdown>
            </ul>

            <ul className="nav navbar-nav navbar-nav-right pull-right">
              {login_display}
            </ul>

          </div>
        </div>
      </nav>
    )
  }
}
