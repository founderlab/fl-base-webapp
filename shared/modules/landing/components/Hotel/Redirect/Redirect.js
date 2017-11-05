import React, {Component} from 'react'
import Website from '/public/images/website.png'
import './Redirect.css'

class Redirect extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className="row with-background redirect-section">
        <div className="container">
          <div className="col-sm-12 col-md-5 redirect-first">
            <h2 className="title bold">Redirect guests to your website</h2>
            <div className="description-section black">
              <p className="description">
                Users click on your deal, and are redirected to your website.
              </p>
              <p className="description">
                Reservations are made directly with you, meaning you are not only building your brand but you also get access to all customer information as soon as the booking is complete.
              </p>
              <p className="description">
                The best part though is we don’t charge commission. We charge a scalable
                subscription fee based on volume of confirmed and stayed reservations. And there are no fees for setup, connection or anything else.
              </p>
            </div>
          </div>
          <div className="col-sm-12 col-md-7 redirect-second">
            <img src={Website} alt="Your Hotel Website" />
          </div>
        </div>
      </section>
    )
  }
}

export default Redirect
