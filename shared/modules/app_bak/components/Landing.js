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
            <p>text</p>

            <Link to="/register" className="btn btn-default btn-xl">Register</Link>

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
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
