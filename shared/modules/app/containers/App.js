import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import Navbar from '../components/Navbar'
import headerTags from '../headerTags'
import {loadAppSettings} from '../actions'


@connect(state => ({
  config: state.config,
  auth: state.auth,
  profiles: state.profiles,
}))
export default class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    config: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired, // eslint-disable-line
    profiles: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    url: PropTypes.string,
    s3Url: PropTypes.string,
    publicPath: PropTypes.string,
  }

  static fetchData({store}, callback) {
    const {app} = store.getState()
    const q = new Queue()
console.log('appfetch')
    if (!app.get('loaded')) q.defer(callback => store.dispatch(loadAppSettings(callback)))
    q.await(err => {
      console.log('fetched')
      callback(err)
    })
  }

  state = {}

  getChildContext() {
    return {
      url: this.state.url,
      s3Url: this.state.s3Url,
      publicPath: this.state.publicPath,
    }
  }

  componentWillMount() {
console.log('appcomponentWillMount')
    if (!this.state.url) {
      this.setState({
        url: this.props.config.get('url'),
        s3Url: this.props.config.get('s3Url'),
        publicPath: this.props.config.get('publicPath'),
      })
    }
  }

  render() {
    const {profiles, location} = this.props
    const profileIm = profiles.get('active')
    const profile = profileIm && profileIm.toJSON()

    const title = `Frameworkstein`
    const description = `Rarr`
    const pageUrl = `${this.state.url}${location.pathname}`
    return (
      <div id="app-outer" className={this.state.client+''}>
        <Helmet titleTemplate="%s | Frameworkstein">
          {headerTags(this.props)}
          <title itemProp="name" lang="en">{title}</title>
          <meta name="description"        content={description} />
          <meta property="og:title"       content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image"       content="https://frameworkstein.com/public/images/landing-image3x.png" />
          <meta property="og:type"        content="website" />
          <meta property="og:url"         content={pageUrl} />
        </Helmet>
        <Navbar
          profile={profile}
        />
        <div className="app-content">{this.props.children}</div>
      </div>
    )
  }
}
