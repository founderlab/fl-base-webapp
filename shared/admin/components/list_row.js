import React, {PropTypes} from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
import {Link} from 'react-router'

export default function AdminModelListRow(props) {
  const {model_admin, model, onSave, onDelete} = props
  return (
    <tr>
      <td><Link to={`/admin/${model_admin.path}/${model.id}`}>{model.name} ({model.id})</Link></td>
      <td><Button bsStyle="primary" onClick={onSave}><Glyphicon glyph="ok" /></Button></td>
      <td><Button bsStyle="danger" onClick={onDelete}><Glyphicon glyph="remove" /></Button></td>
    </tr>
  )
}

AdminModelListRow.propTypes = {
  model: PropTypes.object,
  model_admin: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
}
