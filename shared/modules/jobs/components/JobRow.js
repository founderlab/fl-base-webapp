import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import {Link} from 'react-router'
import ReactMarkdown from 'react-markdown'
import {formatDateFrom} from '../../utils/format'
// import JobLogo from './JobLogo'
import Bullets from '../../utils/components/Bullets'

export default class JobRow extends React.Component {

  static propTypes = {
    item: PropTypes.object,
    job: PropTypes.object,
  }

  state = {
    showDetails: false,
  }

  handleToggleShowDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails,
    })
  }

  render() {
    const job = this.props.job || this.props.item
    const {Job} = job
    const showDetails = this.state.showDetails

    return (
      <div onClick={this.handleToggleShowDetails} className="job-row border-row">

        <Row>
          <Col xs={12}>
            <div className="inline-avatar">

              <div className="inline-avatar-avatar">
                {/*<JobLogo linked Job={Job} />*/}
              </div>

              <div className="inline-avatar-rest">

                <Row>
                  <Col xs={12}>
                    <h3>
                      <Link to={`/Jobs/${Job.id}?p=jobs`}>{Job.name}</Link>
                      <p className="updated pull-right">{formatDateFrom(job.createdDate)}</p>
                    </h3>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <h5>
                      {job.title}
                      <p className="loc pull-right"><i className="fa fa-map-marker" /> {job.location}</p>
                    </h5>
                  </Col>
                </Row>

                <Row className="info-row">
                  <Col xs={3} className="info-item">
                    {job.paymentsString && (<span><i className="fa fa-dollar" /> {job.paymentsString}</span>)}
                  </Col>
                  <Col xs={3} className="info-item">
                    {job.jobTypesString && (<span><i className="fa fa-clock-o" /> {job.jobTypesString}</span>)}
                  </Col>
                  <Col xs={3} className="info-item">
                    {job.skillsString && (<span><i className="fa fa-flask" /> {job.skillsString}</span>)}
                  </Col>
                  <Col xs={3} className="text-right">
                    <Button bsStyle="primary" bsSize="small" href={`mailto:${job.applicationEmail}`} target="_blank">
                      Apply now
                    </Button>
                  </Col>
                </Row>

                <div className="sp-row">
                  <Bullets items={job.sellingPoints} editable={false} emptyMessage="" colProps={{xs: 12}} />
                </div>

                {showDetails && (
                  <div>
                    <Row className="details-row">
                      <Col xs={12}>
                        <ReactMarkdown escapeHtml source={job.detailsMd} />
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>

      </div>
    )
  }
}
