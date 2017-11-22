import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal} from 'react-bootstrap'
import RegisterForm from './RegisterForm'

export default class RegisterModal extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <RegisterForm {...this.props} />
      </Modal>
    )
  }
}
