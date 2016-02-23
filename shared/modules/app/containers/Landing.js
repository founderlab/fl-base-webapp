import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

@connect(state => ({app: state.app}))
export default class Landing extends React.Component {

  static propTypes = {
    app: React.PropTypes.object.isRequired,
  }
  static contextTypes = {
    s3_url: React.PropTypes.string.isRequired,
  }

  render() {
    const landing_image = this.props.app.get('settings').get('landing_image')
    const bg_url = `url(${this.context.s3_url}/${landing_image})`
    return (
      <div>
        <header style={{backgroundImage: bg_url}}>
          <h1>Opportunities for everyone</h1>
          <p>Something about how great they are or how it works</p>
          <LinkContainer to="/opportunities"><Button bsStyle="primary" bsSize="large">Find an opportunity</Button></LinkContainer>
        </header>
      </div>
    )
  }
}
