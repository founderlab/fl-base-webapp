import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {Grid, Row, Col} from 'react-bootstrap'

export default class Privacy extends Component {

  render() {

    return (
      <Grid className="section">
        <Helmet>
          <title itemProp="name" lang="en">Report Your Migration Agent or Lawyer</title>
          <meta name="description" content="If you had a problem with your Australian Registered Migration Agent or lawyer, report them to the Office of the Migration Agents Registration Authority." />
        </Helmet>
        <Row>
          <Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
            <h3>Complaints</h3>
            <p>
              Registered Migration Agents services are regulated by the Office of the Migration Agents Registration Authority (OMARA) and must follow the industry Code of Conduct. A copy of the Code of Conduct and consumer guide for migration services is available <a href="https://www.mara.gov.au/using-an-agent/working-with-your-agent/what-to-expect-from-your-agent/">here</a>.
            </p>

            <p>
              If you wish to make a complaint about your registered migration agent to OMARA, please click on the following <a href="https://www.mara.gov.au/using-an-agent/resolving-disputes-with-your-agent/make-a-complaint-about-an-agent/">link here</a>.
            </p>

            <p>
              Office of the Migration Agents Registration Authority (OMARA) is responsible for ensuring it lists registered migration agents along with those agents who have been cautioned, cancelled or suspended.
            </p>

          </Col>
        </Row>
      </Grid>
    )
  }
}
