import _ from 'lodash'
import inflection from 'inflection'
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export default class Admin extends Component {

  static propTypes = {

  }

  render() {

    const groups = [
      {
        id: 1,
        name: 'group_1',
      },
      {
        id: 2,
        name: 'group_2',
      },
    ]
    const model_type = {
      name: 'group',
    }
    const plural = inflection.pluralize(model_type.name)
    const links = _.map(groups, g => <Link to={`${plural}/${g.id}/`}>{g.name}</Link>)

    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        {links}
      </div>
    )
  }
}
