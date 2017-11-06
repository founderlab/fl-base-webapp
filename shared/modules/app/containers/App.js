import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import Navbar from './Navbar'
import Footer from './Footer'
import headerTags from '../headerTags'
import {loadAppSettings} from '../actions'
import {loadActiveProfile} from '../../profiles/actions'
import LoginModal from '../../users/containers/LoginModal'

@connect(state => ({
  routes: state.router.routes,
  config: state.config,
}))
export default class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    routes: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  static contextTypes = {
    history: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    url: PropTypes.string,
    s3Url: PropTypes.string,
    publicPath: PropTypes.string,
    stripePublishableApiKey: PropTypes.string,
    markdownProps: PropTypes.object,
  }

  static fetchData({store}, callback) {
    const {auth, app, profiles} = store.getState()
    const baseQueue = new Queue()

    if (!app.get('loaded')) baseQueue.defer(callback => store.dispatch(loadAppSettings(callback)))

    baseQueue.await(err => {
      if (err) return callback(err)

      const profileQueue = new Queue()

      if (auth.get('user')) {
        const userId = auth.get('user').get('id')
        if (!profiles.get('loading') && !profiles.get('active')) {
          profileQueue.defer(callback => store.dispatch(loadActiveProfile({user_id: userId}, callback)))
        }
      }

      profileQueue.await(callback)
    })
  }

  constructor() {
    super()
    this.state = {showModal: false}
  }

  getChildContext() {
    return {
      url: this.state.url,
      s3Url: this.state.s3Url,
      publicPath: this.state.publicPath,
      stripePublishableApiKey: this.state.stripePublishableApiKey,
      markdownProps: {
        escapeHtml: true,
        renderers: {
          Link: props => (<a href={props.href} target="_blank">{props.children}</a>),
        },
      },
    }
  }

  componentWillMount() {
    if (!this.state.url) {
      this.setState({
        url: this.props.config.get('url'),
        s3Url: this.props.config.get('s3Url'),
        publicPath: this.props.config.get('publicPath'),
        stripePublishableApiKey: this.props.config.get('stripePublishableApiKey'),
      })
    }
  }

  openLoginModal = (e) => {
    e.preventDefault()
    this.setState({showModal: true})
  }

  closeLoginModal = () => this.setState({showModal: false})

  render() {
    const route = this.props.routes[1]
    const hideFooter = route && route.hideFooter
    const hideNav = route && route.hideNav
    const pageUrl = `${this.state.url}${this.props.location.pathname}`

    return (
      <div id="app-view">
        <Helmet titleTemplate="%s | Frameworkstein">
          {headerTags(this.props)}
          <meta property="og:image"       content="https://www.frameworkstein.com/public/images/logo.png" />
          <meta property="og:type"        content="website" />
          <meta property="og:url"         content={pageUrl} />
        </Helmet>
        <div className="app-content">
          {!hideNav && <Navbar openLoginModal={this.openLoginModal} />}
          <div className="app">
            {this.props.children}
          </div>
          {!hideFooter && <Footer />}
          <LoginModal show={this.state.showModal} onHide={this.closeLoginModal} />
        </div>
      </div>
    )
  }
}
