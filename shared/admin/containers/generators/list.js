import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import {List} from '../../components/list'

export default function createModelList(model_admin) {
  const {load, save, del} = model_admin.actions

  return @connect(state => ({models: state.admin[model_admin.path]}), {load, save, del})
  class AdminListContainer extends Component {

    static propTypes = {
      models: PropTypes.object,
      load: PropTypes.func,
      save: PropTypes.func,
      del: PropTypes.func,
    }

    constructor() {
      super()
      this.state = {
        loaded: false,
        loading: false,
      }
    }

    componentWillMount() {
      if (!this.state.loading && !this.state.loaded) {
        this.fetch()
      }
    }

    fetch() {
      this.state.loading = true
      this.props.load({}, () => {
        this.state.loading = false
        this.state.loaded = true
      })
    }

    hasData() {
      console.log('this.props.models && this.state.loaded', this.props.models, this.state.loaded)
      return this.props.models && this.state.loaded
    }

    render() {
      if (!this.hasData()) return (<p>loading</p>)
      const models = this.props.models

      return (
        <List model_admin={model_admin} models={models} />
      )
    }
  }

}
