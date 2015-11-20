import React, {PropTypes} from 'react'
import {Link} from 'react-router'

export default function AdminModelDetail(props) {

  const {model_admin, id} = props
  const by_id = props.admin.get('by_id').toJSON()
  const model = by_id[id] || {}
  console.log('model is', id, model)

  return (
    <div className="admin-detail">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-1">
              <h1>{model.id}</h1>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Link to={`admin/${model_admin.path}`}>Back</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

AdminModelDetail.propTypes = {
  admin: PropTypes.object,
  id: PropTypes.object,
  model_admin: PropTypes.object,
}
