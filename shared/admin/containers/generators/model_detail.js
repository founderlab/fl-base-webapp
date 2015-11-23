import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Loader from '../../components/loader'
import Detail from '../../components/model_detail'

export default function createModelList(model_admin) {
  const {load, save, del} = model_admin.actions

  return @connect(state => ({admin: state.admin[model_admin.path], id: state.router.params.id}), {load, save, del})
  class ModelDetailContainer extends Component {

    static propTypes = {
      admin: PropTypes.object,
      id: PropTypes.string,
      load: PropTypes.func,
      save: PropTypes.func,
      del: PropTypes.func,
    }

    static needs = [load]

    hasData() {
      return this.props.admin && !this.props.admin.get('loading')
    }

    handleSaveFn = model => data => {this.props.save(_.extend(model, data))}
    handleDeleteFn = model => () => this.props.del(model)

    render() {
      if (!this.hasData()) return (<Loader />)
      const {admin, id} = this.props

      return (
        <Detail id={id} model_admin={model_admin} model_store={admin} handleSaveFn={this.handleSaveFn} handleDeleteFn={this.handleDeleteFn} />
      )
    }
  }

}
