import _ from 'lodash'
import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import ListRow from './list_row'

export default function AdminModelList(props) {
  const {model_admin, admin, onSaveFn, onDeleteFn} = props
  const models_by_id = admin.get('by_id').toJSON()
  const links = _.map(models_by_id, model => (
    <ListRow
      key={model.id}
      model={model}
      model_admin={model_admin}
      onSave={onSaveFn(model)}
      onDelete={onDeleteFn(model)}
    />
  ))

  return (
    <div className="admin-list">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-1">
              <h1>{model_admin.plural}</h1>
              <table>
                <tbody>
                  {links}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Link to="/admin">Admin home</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

AdminModelList.propTypes = {
  admin: PropTypes.object,
  model_admin: PropTypes.object,
  onSaveFn: PropTypes.func,
  onDeleteFn: PropTypes.func,
}
