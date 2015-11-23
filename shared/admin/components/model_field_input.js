import React, {PropTypes} from 'react'
import {Input} from 'react-bootstrap'

export default class FieldInput extends React.Component {
  static propTypes = {
    model_field: PropTypes.object.isRequired,
    form_field: PropTypes.object.isRequired,
  }

  render() {
    const {model_field, form_field} = this.props
    return (
      <Input type="text" placeholder={model_field.name} help={form_field.touched && form_field.error} {...form_field} />
    )
  }
}
