import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal} from 'react-bootstrap'
import Privacy from '../../app/components/PrivacyContent'

export default class TermsModal extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton />
        <Privacy />
      </Modal>
    )
  }
}
