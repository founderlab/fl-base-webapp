import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {Grid, Row, Col} from 'react-bootstrap'
import PrivacyContent from './PrivacyContent'

export default class Privacy extends Component {

  render() {

    return (
      <Grid className="section">
        <Helmet>
          <title itemProp="name" lang="en">Privacy Policy</title>
          <meta name="description" content="This Privacy Policy tells you how we collect and manage your personal information." />
        </Helmet>
        <Row>
          <Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
            <PrivacyContent />
          </Col>
        </Row>
      </Grid>
    )
  }
}
