import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {Grid, Row, Col} from 'react-bootstrap'

@connect(state => ({
  app: state.app,
}))
export default class Contact extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
  }

  render() {
    const settings = this.props.app.get('settings').toJSON()

    return (
      <div className="contact">
        <Helmet>
          <title itemProp="name" lang="en">Frameworkstein Phone & Email - Contact Us</title>
          <meta name="description" content="Get 24/7 help by calling or emailing Frameworkstein. Same day response." />
        </Helmet>
        <Grid className="section text-center">
          <Row>
            <Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
              <h1>Get in touch</h1>
              <p>
                Reach us by emailing <span className="text-info">contact@frameworkstein.com</span> or calling any one of our numbers below. We’ll get back to you as soon as possible.
              </p>
            </Col>
          </Row>
        </Grid>

        <Grid className="section phones">
          <Row>
            <Col xs={12} sm={3}>
              <h5 className="title title-left"><div className="heading-icon"><img src="/public/images/icon-phone-red.png" alt="phone icon" /></div> Our phone numbers</h5>
            </Col>
            <Col xs={12} sm={3} className="phone">
              <div className="inner">
                <h6>Australia</h6>
                <p>{settings.ausPhone}</p>
              </div>
            </Col>
            <Col xs={12} sm={3} className="phone">
              <div className="inner">
                <h6>New Zealand</h6>
                <p>{settings.nzPhone}</p>
              </div>
            </Col>
            <Col xs={12} sm={3} className="phone">
              <div className="inner">
                <h6>United Kingdom</h6>
                <p>{settings.ukPhone}</p>
              </div>
            </Col>
          </Row>
        </Grid>

      </div>
    )
  }
}
