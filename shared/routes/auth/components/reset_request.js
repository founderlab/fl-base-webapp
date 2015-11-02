import React from 'react'
import {ResetRequestForm} from 'fl-auth-react'

export default class ResetRequest extends React.Component {

  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <section id="reset">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <h2 className="text-center">Reset your password</h2>
                <ResetRequestForm {...this.props} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
