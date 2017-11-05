import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {Grid, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {push} from 'redux-router'

@connect(() => {}, {push})
export default class Sales extends Component {

  static propTypes = {
  }

  render() {

    return (
      <div className="sales">
        <Helmet>
          <title itemProp="name" lang="en">Visa Application Leads</title>
          <meta name="description" content="Are you looking for more ready-to-migrate visa applicants? List your profile on Frameworkstein, increase your reputation and grow your immigration business. " />
        </Helmet>

        <header className="clouds">
          <Grid>
            <Row>
              <Col xs={12}>
              </Col>
            </Row>
          </Grid>
        </header>

        <Grid className="section">
          <Row>
            <Col xs={12} sm={4}>
            </Col>
            <Col xs={12} sm={8}>
            </Col>
          </Row>
        </Grid>

      </div>
    )
  }
}
