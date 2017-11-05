import React, {Component} from 'react'
import siteminder from '/public/images/siteminder.png'
import './Setup.css'

class Setup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className="row setup-section">
        <div className="container">
          <div className="col-sm-12 col-md-7">
            <a href="#">
              <img src={siteminder} alt="SiteMinder"/>
            </a>
          </div>
          <div className="col-sm-12 col-md-5">
            <h2 className="title bold">Simple set-up, no fees.</h2>
            <div className="description-section black">
              <p className="description">
                We’ve connected with Siteminder to make setup extremely fast and easy.
              </p>
              <p className="description">
                Sign up, and we’ll help you turn on your channel and get connected in 10 minutes.
              </p>
            </div>
            <button type="button" className="btn btn-primary btn-lg btn-free">sing up now for free</button>
          </div>
        </div>
      </section>
    )
  }
}

export default Setup
