import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {formatLocation, formatDateDuration} from '../../utils/format'

// import JobLogo from './JobLogo'
import {prefixUrl} from '../../utils/prefixLinks'

export default class JobHeader extends React.Component {

  static propTypes = {
    job: PropTypes.object.isRequired,
    errors: PropTypes.object,
    editable: PropTypes.bool,
  }

  constructor() {
    super()
    this.state = {
      editing: false,
    }
  }

  handleToggleEdit = () => this.setState({editing: !this.state.editing})

  render() {
    const {job, errors, editable} = this.props
    const {editing} = this.state
    const locationStr = formatLocation(job)
    if (errors) {
      // console.error('errors:', errors)
    }

    return (
      <Grid fluid className="job-header">
        <Row>
          <Col xs={12} className="job-actions">
            <p className="last-updated">Last updated: {formatDateDuration(job.updatedDate)} ago</p>
            {editable && !editing && (<p><Button bsStyle="primary" onClick={this.handleToggleEdit}>Edit</Button></p>)}
            {job.contactEmail && (<p><Button bsStyle="primary" href={`mailto:${job.contactEmail}`}>Contact</Button></p>)}
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            {/*<JobLogo bordered job={job} />*/}
          </Col>
        </Row>

        <Row className="job-info">
          <Col xs={12}>
            <h1>{job.name}</h1>
            <p className="location">{locationStr}</p>
            <p className="short-description"><a href={prefixUrl(job.websiteUrl)} target="_blank">{job.websiteUrl && job.websiteUrl.split('//').pop()}</a></p>
          </Col>
        </Row>
      </Grid>
    )
  }
}
