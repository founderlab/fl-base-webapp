import _ from 'lodash'
import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Glyphicon} from 'react-bootstrap'
import createModelDetailForm from './generators/model_detail_form'

export default function ModelDetail(props) {

  const {model_admin, model_store, id, handleSaveFn, handleDeleteFn} = props
  const model_im = model_store.get('by_id').get(id)
  const model = model_im ? model_im.toJSON() : {}
  const ModelDetailForm = createModelDetailForm(model)

  return (
    <div className="admin-detail">

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Link to={`/admin/${model_admin.path}`}><Glyphicon glyph="chevron-left" />{model_admin.plural}</Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>{model_admin.display(model)}</h1>
            </div>
          </div>
        </div>
      </section>

      <ModelDetailForm
        formKey={model.id}
        model={model}
        model_admin={model_admin}
        onSubmit={handleSaveFn(model)}
        onDelete={handleDeleteFn(model)}
        fields={_.keys(model_admin.fields)}
      />

    </div>
  )
}

ModelDetail.propTypes = {
  id: PropTypes.string,
  model_store: PropTypes.object,
  model_admin: PropTypes.object,
  handleSaveFn: PropTypes.func,
  handleDeleteFn: PropTypes.func,
}
