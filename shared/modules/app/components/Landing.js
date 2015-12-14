import React from 'react'
import {Link} from 'react-router'

export default function Landing() {

  return (
    <div className="holds-max-height">
      <header>
        <div className="header-content">
          <div className="header-content-inner">
            <h1>1scope wip</h1>
            <hr />
            <p>no</p>

            <Link to="/opportunities" className="btn btn-default btn-xl">Find an opportunity</Link>

            <Link to="/applicants/register" className="btn btn-default btn-xl">Register as a student</Link>

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
              <p className="text-faded">Some explanation or whatever</p>
              <Link to="/opportunities" className="btn btn-default btn-xl">opportunities</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
