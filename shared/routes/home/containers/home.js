import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

@connect((state) => ({auth: state.auth}))
export default class Home extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    auth: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  }

  render() {
    const {auth, dispatch} = this.props
    const logged_in = !!auth.get('email')

    return (
      <div id="home">
        'home'
      </div>
    )
  }
}

