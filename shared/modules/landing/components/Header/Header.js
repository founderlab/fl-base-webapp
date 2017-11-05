import React, {Component} from 'react'
import Logo from '/public/images/logo.png'
import './Header.css'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className="container-fluid">
        <section className="row header-section">
          <div className="col-xs-12 col-sm-4 col-md-3 logo-container">
            <a href="#" className="logo">
              <img src={Logo} alt="Logo" />
              <span>Frameworkstein</span>
            </a>
          </div>
          <nav className="col-md-9 desktop-menu navbar-default text-right" role="navigation">
            <ul>
              <li>
                <button type="button" className="btn btn-default btn-free">Get Frameworkstein for Free</button>
              </li>
              <li><a className="grey-light bold font14" href="#">Invite</a></li>
              <li><a className="grey-light bold font14" href="#">Help</a></li>
              <li><a className="black" href="#">Sing Up</a></li>
              <li><a className="black" href="#">Log In</a></li>
            </ul>
          </nav>
          <nav className="col-xs-12 col-sm-8 col-md-9 mobile-menu navbar-default text-right" role="navigation">
            <button type="button" className="btn btn-default btn-free">Get Frameworkstein for Free</button>
            <div className="btn-group">
              <button type="button" className="btn btn-default dropdown-toggle black" data-toggle="dropdown">Menu <span className="caret"></span></button>
              <ul className="dropdown-menu" role="menu">
                <li><a className="grey-light bold"  href="#">Invite</a></li>
                <li><a className="grey-light bold"  href="#">Help</a></li>
                <li><a className="black"  href="#">Sing Up</a></li>
                <li><a className="black"  href="#">Log In</a></li>
              </ul>
            </div>
          </nav>
        </section>
      </header>
    )
  }
}

export default Header
