import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'

export default class Profile extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {profile} = this.props

    return (
      <section id="login">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <h2 className="text-center">{profile.name}'s profile</h2>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
