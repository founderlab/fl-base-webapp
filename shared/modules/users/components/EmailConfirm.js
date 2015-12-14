import React from 'react'
import {Link} from 'react-router'
import {EmailConfirm as EmailConfirmer} from 'fl-auth-react'

export default function EmailConfirm(props) {
  return (
    <section id="reset">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3">
            <EmailConfirmer {...props}>
              <h2 className="text-center">Thanks! Your email is confirmed.</h2>
              <Link to="/" className="text-center">Head home</Link>
            </EmailConfirmer>
          </div>
        </div>
      </div>
    </section>
  )
}
