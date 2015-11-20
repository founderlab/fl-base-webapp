import React, {PropTypes} from 'react'
import {Button, Glyphicon, Input} from 'react-bootstrap'
import {Link} from 'react-router'

class FieldInput extends React.Component {
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

export default function AdminModelListRow(props) {
  const {model_admin, model, onSave, onDelete, edit_fields} = props

  const fields = [{name: 'name', type: 'text'}]
  const headers = []
  const inputs = []

  fields.forEach(field => {
    headers.push(<td>{field.name}</td>)
    inputs.push(<td key={field.name}><FieldInput model_field={field} form_field={{}} /></td>)
  })

  return (
    <tr>
      <td><Link to={`/admin/${model_admin.path}/${model.id}`}>{model.name} ({model.id})</Link></td>
      {inputs}
      <td><Button bsStyle="primary" bsSize="small" onClick={onSave}><Glyphicon glyph="ok" /></Button></td>
      <td><Button bsStyle="danger" bsSize="small" onClick={onDelete}><Glyphicon glyph="remove" /></Button></td>
    </tr>
  )
}

AdminModelListRow.propTypes = {
  model: PropTypes.object,
  model_admin: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
}
