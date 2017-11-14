import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {loadFaqs} from '../actions'
import Faq from '../components/Faq'

@connect(state => ({app: state.app, type: state.router.params.type}))
export default class FaqContainer extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    type: PropTypes.string,
  }

  static fetchData({store, action}, callback) {
    const {app} = store.getState()
    if (app.get('faqsLoaded')) return callback()
    store.dispatch(loadFaqs(callback))
  }

  render() {
    const {app} = this.props
    const faqType = this.props.type
    const faqList = app.get('faqList').toJSON()
    const faqItems = faqList && _(faqList).filter(f => faqType ? (f.type === faqType) : !f.type).sortBy(f => +f.order).value()

    let title = 'How Frameworkstein Works'
    let description = 'Frameworkstein FAQ'

    return (
      <div>
        <Helmet>
          <title itemProp="name" lang="en">{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        <Faq
          loading={this.props.app.get('faqsLoading')}
          loaded={this.props.app.get('faqsLoaded')}
          faqItems={faqItems}
        />
      </div>
    )
  }
}
