import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import JobHeader from './JobHeader'

export default class JobDetail extends React.Component {

  static propTypes = {
    job: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    children: PropTypes.node.isRequired,
  }

  render() {
    const {job, editable, errors, children} = this.props
    const panelProps = {job, editable, errors}

    return (
      <div className="job">
        <JobHeader {...panelProps} />

        <Grid fluid className="job-body">

          <Row>
            <Col xs={12} className="masonry">
              {children}
            </Col>
          </Row>

        </Grid>
      </div>
    )
  }
}
