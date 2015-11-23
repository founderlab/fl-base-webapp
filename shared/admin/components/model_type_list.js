import _ from 'lodash'
import React from 'react'
import {Link} from 'react-router'
import {model_admins} from '../index'

// Landing page for the auto admin. Just links to all model index pages.
export default function ModelTypeList() {

  const links = []

  _.forEach(model_admins, model_admin => {
    links.push(
      <div key={model_admin.path} className="row">
        <div className="col-lg-8 col-lg-offset-1">
          <Link to={`/admin/${model_admin.path}`}>{model_admin.plural}</Link>
        </div>
      </div>
    )
  })

  return (
    <div className="admin">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-1">
              <h1>Admin Home</h1>
            </div>
          </div>
          {links}
        </div>
      </section>
    </div>
  )

}
