import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Row, Col} from 'react-bootstrap'
import Button from './Button'

export default class EditorButtons extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    onCancel: PropTypes.func,
    submitText: PropTypes.string,
  }

  static defaultProps = {
    submitText: 'Save',
  }

  render() {
    const {loading, submitText} = this.props
    return (
      <Row className="actions">
        <Col xs={12}>
          {this.props.onCancel ? (<Button disabled={loading} onClick={this.props.onCancel} bsSize="lg">Cancel</Button>) : null}
          <div className={this.props.onCancel ? 'pull-right' : 'text-center'}>
            <Button loading={loading} type="submit" bsStyle="primary" bsSize="lg">{submitText}</Button>
          </div>
        </Col>
      </Row>
    )
  }
}
