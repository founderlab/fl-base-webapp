import _ from 'lodash'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
// import {actions} from '../../index'

export default function createModelList(model_admin) {

  return @connect(state => ({models: state.admin[model_admin.path]}))
  class AdminListContainer extends Component {

    static propTypes = {
      models: PropTypes.object,
      params: PropTypes.object,
    }

    render() {
      const models = this.props.models.toJSON()
      const model = models[this.props.params.id]
      console.log('model is', model)

      // const links = []
      // _.forEach(models, model => {
      //   links.push(<Link to={`/admin/${model_admin.path}/${model.id}`} key={model.id}>{model.name} ({model.id})</Link>)
      // })

      return (
        <div className="admin-list">
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
  }

}
