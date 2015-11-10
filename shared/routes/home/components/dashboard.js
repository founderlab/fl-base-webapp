import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
export default class Landing extends Component {

  render() {
    return (
      <div className="holds-max-height">

        <section className="bg-primary">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 text-center">

                <br />
                <br />

                <Link to="/admin">admin</Link>
                <Link to="/admin/users">users</Link>

              </div>
            </div>
          </div>
        </section>

      </div>
    )
  }
}
