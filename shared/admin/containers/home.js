import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {model_admins} from '../index'

// Landing page for the auto admin. Just links to all model index pages.
export default class AdminHome extends Component {

  static propTypes = {
  }

  render() {
    const links = []

    _.forEach(model_admins, model_admin => {
      links.push(<Link to={`/admin/${model_admin.path}`} key={model_admin.path}>{model_admin.plural}</Link>)
    })

    return (
      <div className="admin">
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-1">
                <h1>Admin Home</h1>
                {links}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
