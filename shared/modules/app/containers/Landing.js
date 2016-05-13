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
    s3Url: React.PropTypes.string.isRequired,
  }

  render() {
    const landingImage = this.props.app.get('settings').get('landingImage')
    const bgUrl = `url(${this.context.s3Url}/${landingImage})`
    return (
      <div>
        <header style={{backgroundImage: bgUrl}}>
          <h1>Opportunities for everyone</h1>
          <p>Something about how great they are or how it works</p>
          <LinkContainer to="/opportunities"><Button bsStyle="primary" bsSize="large">Find an opportunity</Button></LinkContainer>
        </header>
      </div>
    )
  }
}
