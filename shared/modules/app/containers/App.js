import Queue from 'queue-async'
import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import NavBar from './NavBar'
import Footer from './Footer'
import headerTags from '../headerTags'
import {loadAppSettings} from '../actions'
import {loadActiveProfile} from '../../users/profile_actions'

@connect(state => ({name: state.config.get('name')}))
export default class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
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
    return (
      <div id="app-view">
        <Helmet
          title=""
          titleTemplate={`%s - ${this.props.name}`}
          {...headerTags(this.props)}
        />
        <NavBar />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
