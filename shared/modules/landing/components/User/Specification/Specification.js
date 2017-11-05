import React, {Component} from 'react'
import './Specification.css'

class Specification extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className="row with-background specification-section">
        <h2 className="title text-center bold">How It Works</h2>
        <div className="specification-list">
          <div className="col-md-4 col-left-z">
            <div className="spec-install">
              <img src="/public/images/install.png" alt="Install"/>
            </div>
            <div className="bottom text-center">
              <button type="button" className="btn btn-primary btn-lg btn-free">Install Now</button>
              <h3 className="title bold">Install TravelBee extension</h3>
              <p className="description">Frameworkstein lives in your Chrome browser, waiting patiently until it can help you.</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="spec-browse">
              <img src="/public/images/browser.png" alt="Browse for hotels"/>
            </div>
            <div className="bottom">
              <h3 className="title bold">Browse for hotels</h3>
              <p className="description">Browse for hotels on sites like Booking.com, Expedia and Trivago, and we’ll alert you if we have a rate that’s even cheaper.</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="spec-instantly">
              <img src="/public/images/save-instantly.png" alt="Browse for hotels"/>
            </div>
            <div className="bottom">
              <h3 className="title bold">Save instantly</h3>
              <p className="description">We show you the cheaper rate, direct you to the hotel’s website where the rate is available, and give you a special promo-code to redeem it.</p>
            </div>
          </div>
        </div>

      </section>
    )
  }
}

export default Specification
