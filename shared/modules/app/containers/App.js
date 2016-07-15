import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import Navbar from './Navbar'
import Footer from './Footer'
import headerTags from '../headerTags'
import {loadAppSettings} from '../actions'
import {loadActiveProfile} from '../../users/profileActions'

@connect(state => ({config: state.config}))
export default class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    config: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    publicPath: React.PropTypes.string,
    s3Url: React.PropTypes.string,
  }

  constructor() {
    super()
    this.state = {}
  }

  getChildContext() {
    return {publicPath: this.state.publicPath, s3Url: this.state.s3Url}
  }

  componentWillMount() {
    if (!this.state.s3Url) this.setState({publicPath: this.props.config.get('publicPath'), s3Url: this.props.config.get('s3Url')})
  }

  static fetchData({store, action}, callback) {
    const {app, auth, profiles} = store.getState()
    const queue = new Queue()

    if (!app.get('loaded')) queue.defer(callback => store.dispatch(loadAppSettings(callback)))

    if (auth.get('user') && !profiles.get('loading') && !profiles.get('active')) {
      const user_id = auth.get('user').get('id')
      queue.defer(callback => store.dispatch(loadActiveProfile({user_id}, callback)))
    }

    queue.await(callback)
  }

  render() {
    const name = this.props.config.get('name')
    return (
      <div id="app-view">
        <Helmet
          title=""
          titleTemplate={`%s - ${name}`}
          {...headerTags(this.props)}
        />
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
