import React, {Component} from 'react'
import './CheaperPrice.css'
import cheaper from '/public/images/cheaper-price-found.png'

class CheaperPrice extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className="row cheaper-price-section text-center">
        <div className="col-md-5">
          <div className="cheaper-left">
            <h3 className="title bold">Why are we always cheaper?</h3>
            <p className="description">
              Online Travel Agents like Expedia and Booking.com take high commissions from hotels for bookings.
              By partnering with hotels directly, we’ve cut out the middleman and passed on the savings to you!
            </p>
            <button type="button" className="btn btn-primary btn-lg btn-free">Install Now</button>
          </div>
        </div>
        <div className="col-md-7 cheaper-right">
          <img src={cheaper} alt="Cheaper Price Found"/>
        </div>
      </section>
    )
  }
}

export default CheaperPrice
