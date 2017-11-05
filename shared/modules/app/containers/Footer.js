import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {Grid, Row, Col} from 'react-bootstrap'
import TermsModal from '../../users/components/TermsModal'
import PrivacyModal from '../../users/components/PrivacyModal'

@connect(state => ({
  app: state.app,
}))
export default class Navbar extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {showTermsModal: false, showPrivacyModal: false}
  }

  openTermsModal = () =>  this.setState({showTermsModal: true})
  openPrivacyModal = () =>  this.setState({showPrivacyModal: true})

  closeTermsModal = () => this.setState({showTermsModal: false})
  closePrivacyModal = () => this.setState({showPrivacyModal: false})

  render() {
    const settings = this.props.app.get('settings').toJSON()

    return (
      <footer>
        <Grid className="footer">
          <Row>
            <Col xs={12}>
              <Link className="footer-logo" to="/" onlyActiveOnIndex><img src="/public/images/logo.png" alt="Frameworkstein logo" /></Link>
              <div className="footer-links">
                <a className="i-list" href="https://blog.frameworkstein.com/blog">Blog</a>
                <Link className="i-list" to="/faq">FAQ</Link>
                <Link className="i-list" to="/faq/agent">Agent FAQ</Link>
                <Link className="i-list" to="/terms">Terms & Conditions</Link>
                <Link className="i-list" to="/privacy">Privacy Policy</Link>
                <Link className="i-list" to="/make-a-complaint/australia">Make a complaint</Link>
                <Link className="i-list" to="/contact">Contact us</Link>
              </div>
              <div className="footer-copyright">
                {settings.footerCopyright}
              </div>
              <div className="footer-social">
                <a className="i-list" target="_blank" href="https://facebook.com/frameworkstein"><i className="fa fa-facebook" /></a>
                <a className="i-list" target="_blank" href="https://twitter.com/frameworkstein"><i className="fa fa-twitter" /></a>
              </div>
            </Col>
          </Row>
        </Grid>
        <TermsModal show={this.state.showTermsModal} onHide={this.closeTermsModal} />
        <PrivacyModal show={this.state.showPrivacyModal} onHide={this.closePrivacyModal} />
      </footer>
    )
  }
}
