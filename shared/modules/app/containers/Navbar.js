import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {NavDropdown, Navbar, Nav, MenuItem, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

@connect(state => ({auth: state.auth}))
export default class AppNavbar extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  render() {
    const user = this.props.auth.get('user')
    let loginDisplay = null

    if (user) {
      loginDisplay = (
        <NavDropdown id="user-dropdown" title={user.get('email')}>
          {user.get('admin') && <MenuItem href="/admin">Admin</MenuItem>}
          <LinkContainer to="/"><MenuItem>Dashboard</MenuItem></LinkContainer>
          <LinkContainer to="/profile"><MenuItem>Profile</MenuItem></LinkContainer>
          <LinkContainer to="/report"><MenuItem>Report a Problem</MenuItem></LinkContainer>
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
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" onlyActiveOnIndex>FounderLab_replaceme</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              {loginDisplay}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
