import _ from 'lodash' // eslint-disable-line
import Helmet from 'react-helmet'
import React from 'react'
import {connect} from 'react-redux'
import Landing from '../components/Landing'

@connect(state => _.extend(_.pick(state, 'auth')))
export default class LandingContainer extends React.Component {

  render() {
    return (
      <section className="landing">
        <Helmet>
          <title itemProp="name" lang="en">Travelbee</title>
          <meta name="description" content="" />
        </Helmet>
        <Landing />
      </section>
    )
  }
}
