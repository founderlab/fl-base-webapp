import React, {PropTypes} from 'react'
import {Input} from 'react-bootstrap'

export default class FieldInput extends React.Component {
  static propTypes = {
    model_field: PropTypes.object.isRequired,
    form_field: PropTypes.object.isRequired,
    size: PropTypes.string,
  }

  render() {
    const {model_field, form_field, size} = this.props
    console.log('model_field, form_field', model_field, form_field)
    const type = 'text'
    return (
      <Input
        type={type}
        label={size === 'large' ? model_field.name : null}
        bsSize={size}
        placeholder={model_field.name}
        help={form_field.touched && form_field.error}
        {...form_field}
      />
    )
  }
}
