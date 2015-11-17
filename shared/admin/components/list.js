import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
import {Link} from 'react-router'

export default class AdminModelList extends Component {

  static propTypes = {
    admin: PropTypes.object,
    model_admin: PropTypes.object,
  }

  render() {
    const model_admin = this.props.model_admin
    const admin = this.props.admin.toJSON()
    console.log('props admin', admin)
    const links = []
    _.forEach(admin.models, model => {
      links.push(
        <tr>
          <td><Link to={`/admin/${model_admin.path}/${model.id}`} key={model.id}>{model.name} ({model.id})</Link></td>
          <td><Button bsStyle="danger"><Glyphicon glyph="remove" /></Button></td>
        </tr>
      )
    })

    return (
      <div className="admin-list">
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-1">
                <h1>{model_admin.plural}</h1>
                <table>
                  {links}
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
}
