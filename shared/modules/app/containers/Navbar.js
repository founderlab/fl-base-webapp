import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {push} from 'redux-router'
import {connect} from 'react-redux'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Avatar from '../../utils/components/Avatar'

const Logout = () => (<li><a href="/logout">Sign out</a></li>)  // eslint-disable-line

@connect(state => ({profiles: state.profiles}), {push})
export default class AppNavbar extends Component {              // eslint-disable-line

  static propTypes = {
    profiles: PropTypes.object.isRequired,
    openLoginModal: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  state = {}

  render() {
    const profile = this.props.profiles.get('active') ? this.props.profiles.get('active').toJSON() : null
    let loginDisplay = null

    if (profile) {
      loginDisplay = [
        <LinkContainer key="profile" to="/profile"><NavItem>{profile.displayName}</NavItem></LinkContainer>,
        <LinkContainer key="avatar" to="/profile"><NavItem><Avatar smaller profile={profile} /></NavItem></LinkContainer>,
        <Logout key="logout" />,
      ]
    }
    else {
      loginDisplay = [
        <LinkContainer key="login" to="/login"><NavItem>Login</NavItem></LinkContainer>,
        <NavItem key="pdiv1" className="divider">|</NavItem>,
        <LinkContainer key="register" to="/register"><NavItem>Sign up</NavItem></LinkContainer>,
      ]
    }

    return (
      <Navbar collapseOnSelect>
        <div className="nav-left">
          <Link className="nav-logo i-list" to="/" onlyActiveOnIndex><img src="/public/images/logo.png" alt="Frameworkstein logo" /></Link>
        </div>

        <div className="nav-right" style={{display: this.state.searchVisible ? 'none' : 'block'}}>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav pullRight className="nav-links">
              {loginDisplay}
            </Nav>
          </Navbar.Collapse>
        </div>

      </Navbar>
    )
  }
}
