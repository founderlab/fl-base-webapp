import React, {Component} from 'react'
import shopping from '/public/images/shopping.png'
import './Shopping.css'

class Shopping extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className="row shopping-section">
        <div className="container">
          <div className="col-md-11 top">
            <h1 className="title bold">Your hotel-shopping guardian angel. </h1>
            <p className="description grey-soft">
              We’ve got the cheapest hotel prices on the web.<br/>
              Install Frameworkstein, browse for hotels on sites like Booking.com, Expedia and Trivago, and we’ll alert you if we have a rate that’s even cheaper.
            </p>
          </div>
          <div className="col-md-12 bottom">
            <img src={shopping} alt="Shopping" />
          </div>
        </div>
      </section>
    )
  }
}

export default Shopping
