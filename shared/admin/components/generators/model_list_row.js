import _ from 'lodash'
import React, {PropTypes} from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
import {Link} from 'react-router'
import {reduxForm} from 'redux-form'
import ModelFieldInput from '../model_field_input'

export class ModelListRow extends React.Component {

  static propTypes = {
    model: PropTypes.object,
    model_admin: PropTypes.object,
    fields: PropTypes.array,
    handleSubmit: PropTypes.func,
    handleDelete: PropTypes.func,
  }

  render() {
    const {model_admin, model, handleDelete, fields, handleSubmit} = this.props
    const inputs = []

    _.forEach(fields, (field, name) => {
      const model_field = {name, type: 'text'}
      inputs.push(<td key={field.name}><ModelFieldInput model_field={model_field} form_field={field} /></td>)
    })

    return (
      <tr>
        <td><Link to={`/admin/${model_admin.path}/${model.id}`}>{model.name} ({model.id})</Link></td>
        {inputs}
        <td><Button bsStyle="primary" bsSize="small" onClick={handleSubmit}><Glyphicon glyph="ok" /></Button></td>
        <td><Button bsStyle="danger" bsSize="small" onClick={handleDelete}><Glyphicon glyph="remove" /></Button></td>
      </tr>
    )
  }
}

export default function createModelListRow(model) {
  return reduxForm(
    {
      form: 'model_list_row',
    },
    () => {
      return {
        initialValues: model,
      }
    }
  )(ModelListRow)
}
