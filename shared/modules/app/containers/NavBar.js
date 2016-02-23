import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import {login} from 'fl-auth-redux'
import {NavDropdown, Navbar, Nav, MenuItem, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {STUDENT, REPRESENTATIVE} from '../../../consts/user_types'

@connect(state => _.extend(_.pick(state, 'auth', 'config'), {query: state.router.location.query}), {login, pushState})
export default class NavBar extends Component {

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
          {user.get('type') === STUDENT && <LinkContainer to={'/applications'}><MenuItem>Applications</MenuItem></LinkContainer>}
          {user.get('admin') && <MenuItem href="/admin">Admin</MenuItem>}
          <LinkContainer to={'/profile'}><MenuItem>Profile</MenuItem></LinkContainer>
          <LinkContainer to={'/report'}><MenuItem>Report a Problem</MenuItem></LinkContainer>
          <li><a href="/logout">Logout</a></li>
        </NavDropdown>
      )
    }
    else {
      login_display = [
        <LinkContainer key={1} to="/register"><NavItem>Register</NavItem></LinkContainer>,
        <LinkContainer key={2} to="/login"><NavItem>Sign in</NavItem></LinkContainer>,
      ]
    }

    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to={'/'} onlyActiveOnIndex><a>1scope.com</a></LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/opportunities'}><NavItem>Opportunities</NavItem></LinkContainer>
            {user && user.get('type') === REPRESENTATIVE && ([
              <LinkContainer to={'/manage/opportunities'} key={1} onlyActiveOnIndex><NavItem>Manage Opportunities</NavItem></LinkContainer>,
              <LinkContainer to={'/manage/opportunities/create'} key={2}><NavItem>Create an Opportunity</NavItem></LinkContainer>,
            ])}
          </Nav>
          <Nav pullRight>
            {login_display}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    )
  }
}