import React from 'react'
import {Link} from 'react-router'

export default class Landing extends React.Component {

  render() {
    return (
      <div className="holds-max-height">
        <header>
          <div className="header-content">
            <div className="header-content-inner">
              <h1>new project wip</h1>
              <hr />

              <Link to="/opportunities" className="btn btn-default btn-xl">Find an opportunity</Link>

              <Link to="/organisations" className="btn btn-default btn-xl">Organisations</Link>

              <Link to="/applicants/register" className="btn btn-default btn-xl">Register as a applicant</Link>

              <Link to="/representatives/register" className="btn btn-default btn-xl">Register as a representative</Link>

            </div>
          </div>
        </header>

        <section className="bg-primary" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 text-center">
                <h2 className="section-heading">Landing page heading</h2>
                <hr className="light" />
                <p className="text-faded">Some subtext</p>
                <Link to="/opportunities" className="btn btn-default btn-xl">opportunities</Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    )
  }
}
