import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import Helmet from 'react-helmet'
import {loadStaticPage} from '../actions'
import Loader from '../../utils/components/Loader'
import NotFound from '../../utils/components/NotFound'
import StaticPage from '../components/StaticPage'

@connect(state => ({app: state.app, slug: state.router.params.slug}), {pushState})
export default class StaticPageContainer extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    pushState: PropTypes.func.isRequired,
  }

  static fetchData({store, action}, callback) {
    const {app, router} = store.getState()
    const slug = ((action && action.payload && action.payload.params) || router.params).slug
    if (app.get('pagesBySlug').get(slug)) return callback()
    store.dispatch(loadStaticPage(slug, (err, action) => {
      if (err) return callback(err)
      if (!action.res) return callback(null, {status: 404})
      callback()
    }))
  }

  page() {
    const {app, slug} = this.props
    return app.get('pagesBySlug').get(slug)
  }

  render() {
    if (this.props.app.get('loading')) return (<Loader />)
    const page = this.page()
    if (!page) return (<NotFound />)
    return (
      <div>
        <Helmet title={page.toJSON().title} />
        <StaticPage page={page.toJSON()} />
      </div>
    )
  }
}
