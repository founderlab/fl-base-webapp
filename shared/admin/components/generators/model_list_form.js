import _ from 'lodash'
import React, {PropTypes} from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
import {Link} from 'react-router'
import {reduxForm} from 'redux-form'
import ModelFieldInput from '../model_field_input'

export class ModelListForm extends React.Component {

  static propTypes = {
    model: PropTypes.object,
    model_admin: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    handleDelete: PropTypes.func,
  }

  render() {
    const {model_admin, model, handleDelete, fields, handleSubmit} = this.props
    const inputs = []

    _.forEach(fields, (field, name) => {
      const model_field = model_admin.fields[name]
      inputs.push(<td key={name}><ModelFieldInput model_field={model_field} form_field={field} size="small" /></td>)
    })

    return (
      <tr>
        <td><Link to={`/admin/${model_admin.path}/${model.id}`}>{model_admin.display(model)}</Link></td>
        {inputs}
        {inputs.length && <td><Button bsStyle="primary" onClick={handleSubmit}><Glyphicon glyph="ok" /></Button></td>}
        <td><Button bsStyle="danger" bsSize="xsmall" onClick={handleDelete}><Glyphicon glyph="remove" /></Button></td>
      </tr>
    )
  }
}

export default function createModelListRowForm(model) {
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
