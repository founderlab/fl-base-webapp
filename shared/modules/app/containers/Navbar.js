import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link, pushState} from 'redux-router'
import {login} from 'fl-auth-redux'
import {NavDropdown, Navbar, Nav, MenuItem, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

@connect(state => _.extend(_.pick(state, 'auth', 'config'), {query: state.router.location.query}), {login, pushState})
export default class Navbar extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired,
  }

  onLogin = data => {
    this.props.login(`${this.props.config.get('url')}/login`, data.email, data.password, err => {
      if (!err) this.props.pushState(null, this.props.query.redirectTo || '/')
    })
  }

  render() {
    const user = this.props.auth.get('user')
    let loginDisplay = null

    if (user) {
      loginDisplay = (
        <NavDropdown id="user-dropdown" title={user.get('email')}>
          {user.get('admin') && <MenuItem href="/admin">Admin</MenuItem>}
          <LinkContainer to={'/profile'}><MenuItem>Profile</MenuItem></LinkContainer>
          <LinkContainer to={'/report'}><MenuItem>Report a Problem</MenuItem></LinkContainer>
          <li><a href="/logout">Logout</a></li>
        </NavDropdown>
      )
    }
    else {
      loginDisplay = [
        <LinkContainer key={1} to="/register"><NavItem>Register</NavItem></LinkContainer>,
        <LinkContainer key={2} to="/login"><NavItem>Sign in</NavItem></LinkContainer>,
      ]
    }

    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'} onlyActiveOnIndex>FounderLab_replaceme</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} onlyActiveOnIndex><NavItem>Some link</NavItem></LinkContainer>
          </Nav>
          <Nav pullRight>
            {loginDisplay}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    )
  }
}
