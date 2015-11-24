import _ from 'lodash'
import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Table, Glyphicon} from 'react-bootstrap'
import createModelListForm from './generators/model_list_form'

export default function ModelList(props) {

  const {model_admin, model_store, handleSaveFn, handleDeleteFn} = props

  const fields = {}
  _.forEach(model_admin.fields, (field, name) => {
    if (field.inline) fields[name] = field
  })

  const model_list_rows = _.map(model_store.get('by_id').toJSON(), model => {
    const ModelListForm = createModelListForm(model)

    return (<ModelListForm
      key={model.id}
      formKey={model.id}
      model={model}
      model_admin={model_admin}
      onSubmit={handleSaveFn(model)}
      onDelete={handleDeleteFn(model)}
      fields={_.keys(fields)}
    />)
  })

  const edit_fields = _.map(fields, (field, name) => <th key={name}>{name}</th>)
  const headings = [<th key="__fl_model">model</th>]
    .concat(edit_fields)
    .concat(edit_fields.length ? [<th key="__fl_save">save</th>] : [])
    .concat([<th key="__fl_delete">delete</th>])

  return (
    <div className="admin-list">
      <section>
        <div className="container">
          <div className="">
            <div className="col-lg-12">
              <Link to="/admin"><Glyphicon glyph="chevron-left" />Admin home</Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="">
            <div className="col-lg-8 col-lg-offset-1">
              <h1>{model_admin.plural}</h1>
              <Table>
                <thead>
                  <tr>
                    {headings}
                  </tr>
                </thead>
                <tbody>
                  {model_list_rows}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

ModelList.propTypes = {
  model_store: PropTypes.object,
  model_admin: PropTypes.object,
  handleSaveFn: PropTypes.func,
  handleDeleteFn: PropTypes.func,
}
