import Queue from 'queue-async'
import React, {Component, PropTypes} from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import {loadAppSettings} from '../actions'
import {loadOpportunityTypes, loadIndustries} from '../../opportunities/actions'
import {loadActiveProfile} from '../../users/profile_actions'

export default class App extends Component {

  static propTypes = {
    children: PropTypes.node,
  }

  static fetchData({store, action}, callback) {
    const {app, auth, opportunities, profiles} = store.getState()
    const queue = new Queue()

    if (!app.get('loaded')) queue.defer(callback => store.dispatch(loadAppSettings(callback)))

    if (!opportunities.get('loading')) {
      if (!opportunities.get('opportunity_types').size) queue.defer(callback => store.dispatch(loadOpportunityTypes(callback)))
      if (!opportunities.get('industries').size) queue.defer(callback => store.dispatch(loadIndustries(callback)))
    }

    if (auth.get('user') && !profiles.get('loading') && !profiles.get('active')) {
      const user_id = auth.get('user').get('id')
      queue.defer(callback => store.dispatch(loadActiveProfile({user_id}, callback)))
    }

    queue.await(callback)
  }

  render() {
    return (
      <div id="app-view">
        <NavBar />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
