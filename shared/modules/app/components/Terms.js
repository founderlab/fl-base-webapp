import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {Grid, Row, Col} from 'react-bootstrap'
import TermsContent from './TermsContent'

export default class Terms extends Component {

  render() {
    return (
      <Grid className="section">
        <Helmet>
          <title itemProp="name" lang="en">Terms of Use</title>
          <meta name="description" content="This User Agreement describes the terms and conditions on which you are allowed to use our Website and our Services." />
        </Helmet>
        <Row>
          <Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
            <TermsContent />
          </Col>
        </Row>
      </Grid>
    )
  }
}
