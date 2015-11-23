import _ from 'lodash'
import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Table, Glyphicon} from 'react-bootstrap'
import createModelListRow from './generators/model_list_row'

export default function ModelList(props) {

  const {model_admin, admin, handleSaveFn, handleDeleteFn} = props
  const models_by_id = admin.get('by_id').toJSON()

  const model_list_rows = _.map(models_by_id, model => {
    const ModelListRow = createModelListRow(model)

    return (<ModelListRow
      key={model.id}
      formKey={model.id}
      model={model}
      model_admin={model_admin}
      onSubmit={handleSaveFn(model)}
      onDelete={handleDeleteFn(model)}
      fields={['name']}
    />)
  })

  return (
    <div className="admin-list">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Link to="/admin"><Glyphicon glyph="chevron-left" />Admin home</Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-1">
              <h1>{model_admin.plural}</h1>
              <Table>
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
  admin: PropTypes.object,
  model_admin: PropTypes.object,
  handleSaveFn: PropTypes.func,
  handleDeleteFn: PropTypes.func,
}
