import React, {Component} from 'react'
import Booking from '/public/images/booking.png'
import './Bookings.css'

class Bookings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className="row bookings-section">
        <div className="container">
          <div className="col-md-11 top">
            <h1 className="title bold">Drive direct bookings from OTAs.</h1>
            <p className="description grey-soft">
              What if your hotel could display its prices on top of OTA websites?<br/>
              Frameworkstein partners with hotels to display their best rate to people browsing OTAs. You get the direct booking, the customer saves, it’s a win-win.
            </p>
          </div>
          <div className="col-md-12 bottom">
            <img src={Booking} alt="Booking" />
          </div>
        </div>
      </section>
    )
  }
}

export default Bookings
