import React, {Component} from 'react'
import Logo from '/public/images/logo-dark.png'

import './Footer.css'

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <footer className="container-fluid footer">
        <div className="row">
          <div className="col-xs-12 col-sm-9 footer-menu">
            <a className="logo" href="#"><img src={Logo} alt="Frameworkstein" /></a>
            <nav>
              <ul>
                <li><a href="#">Help</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Copyright</a></li>
                <li><a href="#">Terms</a></li>
              </ul>
            </nav>
          </div>
          <div className="col-xs-12 col-sm-3 social text-right">
            <a href="#facebook">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="#twitter">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="#instagram">
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>
            <a href="#pinterest">
              <i className="fa fa-pinterest" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
