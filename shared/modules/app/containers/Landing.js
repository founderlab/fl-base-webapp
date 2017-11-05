import _ from 'lodash' // eslint-disable-line
import Helmet from 'react-helmet'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Landing from '../components/Landing'

@connect(state => _.extend(_.pick(state, 'auth')))
export default class LandingContainer extends React.Component {

  static propTypes = {
  }

  render() {
    const {} = this.props

    return (
      <section className="landing">
        <Helmet>
          <title itemProp="name" lang="en">Frameworkstein</title>
          <meta name="description" content="" />
        </Helmet>
        <Landing loading={loading} />
      </section>
    )
  }
}
