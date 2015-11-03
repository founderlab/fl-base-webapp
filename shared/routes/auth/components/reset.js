import React, {Component, PropTypes} from 'react'
import {ResetForm} from 'fl-auth-react'

export default class Reset extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    return (
      <section id="reset">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <h2 className="text-center">Enter a new password</h2>
                <ResetForm {...this.props} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
