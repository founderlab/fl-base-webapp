import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'

export default class Profile extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    return (
      <section id="login">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <h2 className="text-center">Profile</h2>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
