import React, {PropTypes} from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

export default class NotFound extends React.Component {

  static propTypes = {
    message: PropTypes.string,
  }

  render() {
    const {message} = this.props

    return (
      <section className="error-page text-center">
        <Grid className="shadow-panel padded">
          <Row>
            <Col xs={12}>
              <h1><i className="fa fa-frown-o" /></h1>
              <h2>Not found</h2>
              {message ? {message} : (<p>We couldn't find the page you requested</p>)}
              <LinkContainer to="/"><Button bsStyle="primary" bsSize="large">Return home</Button></LinkContainer>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
