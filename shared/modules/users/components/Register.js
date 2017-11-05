import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col, Panel} from 'react-bootstrap'
import RegisterForm from './RegisterForm'

export default class Register extends Component {
  render() {
    return (
      <div className="form-page register">

        <header className="clouds">
          <Grid>
            <Row>
              <Col xs={12}>
                <h1 className="text-center">Create your Frameworkstein profile</h1>
              </Col>
            </Row>
          </Grid>
        </header>

        <Grid>
          <Row>
            <Col xs={12} lg={10} lgOffset={1}>
              <Panel className="inset-form">
                <RegisterForm {...this.props} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
