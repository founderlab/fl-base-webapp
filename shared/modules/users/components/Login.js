import React from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col, Panel} from 'react-bootstrap'
import LoginForm from './LoginForm'

export default function Login(props) {
  return (
    <div className="form-page login">

      <header>
        <Grid>
          <Row>
            <Col xs={12}>
              <h1 className="text-center">Login</h1>
            </Col>
          </Row>
        </Grid>
      </header>

      <Grid>
        <Row>
          <Col xs={12} sm={10} smOffset={1} md={12} mdOffset={0}>
            <Panel className="panel-form">
              <LoginForm {...props} />
            </Panel>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}
