import _ from 'lodash'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Loader from '../../components/loader'
import List from '../../components/model_list'

export default function createModelList(model_admin) {
  const {load, save, del} = model_admin.actions

  return @connect(state => ({admin: state.admin[model_admin.path]}), {load, save, del})
  class ModelListContainer extends Component {

    static propTypes = {
      admin: PropTypes.object,
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
      const admin = this.props.admin

      return (
        <List model_admin={model_admin} model_store={admin} handleSaveFn={this.handleSaveFn} handleDeleteFn={this.handleDeleteFn} />
      )
    }
  }

}
