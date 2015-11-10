import _ from 'lodash'
import inflection from 'inflection'
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

// Landing page for the auto admin. Just links to all model index pages.

export default class Admin extends Component {

  static propTypes = {

  }

  render() {
    const model_types = [
      {
        name: 'group',
      },
    ]
    const links = []

    _.forEach(model_types, model_type => {
      const plural = inflection.pluralize(model_type.name)
      links.push(<Link to={`/admin/${plural}`} key={model_type.name}>{model_type.name}</Link>)
    })

    return (
      <div className="admin">
        <br />
        <br />
        <br />
        <br />
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-1">
                {links}
              </div>
            </div>
          </div>
        </section>

      </div>
    )
  }
}
