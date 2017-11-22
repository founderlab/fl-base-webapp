import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class StaticPage extends Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
  }

  render() {
    const {page} = this.props
    return (
      <div>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{__html: page.content}} />
      </div>
    )
  }
}
