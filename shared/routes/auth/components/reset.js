import React from 'react'
import {ResetForm} from 'fl-auth-react'

export default class Reset extends React.Component {

  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <section id="reset">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <h2 className="text-center">Reset</h2>
                <ResetForm {...this.props} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
