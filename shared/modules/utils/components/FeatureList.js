import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Row, Col} from 'react-bootstrap'

export default class FeatureList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  render() {
    const {items} = this.props

    return (
      <div className="features">
        <Row className="features-row">
          {_.map(items, (item, i) => (
            <Col key={i} xs={6} sm={4} lg={3} className="feature">
              <i className="fa fa-check" /> {_.isObject(item) ? item.name : item}
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}
