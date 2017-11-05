import React, {Component} from 'react'
import price from '/public/images/price.png'
import './Price.css'

class Price extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <section className="row with-background price-description-section">
          <div className="container">
            <div className="col-sm-12 col-md-5 col-lg-5">
              <h1 className="title bold">No price perity required</h1>
              <div className="description-section black">
                <p className="description">
                  Technically, we’re an ‘OTA’. That means you can set cheaper rates through our platform than you give to other OTAs, without breaching your contracts with them.
                </p>
                <p className="description">
                  Imagine being able to show a cheaper price when someone is browsing your site on an OTA?
                </p>
                <p className="description">
                  That’s powerful way to drive direct bookings.
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg-7">
              <img src={price} alt="Cheaper price found" />
            </div>
          </div>
        </section>
        <section className="row price-section">
          <div className="col-lg-12 text-center">
            <h2 className="title bold">Pricing that scales with you</h2>
            <p className="description">Your lowest risk, lowest cost acquisition channel</p>
          </div>
          <div className="col-lg-12 price-table">
            <div className="row table-list">
              <div className="col-sm-6 col-md-3 col-lg-3 table-element black">
                <div className="element">
                  <p className="table-title text-center bold">0 - 5 bookings/<span className="light">month</span></p>
                  <div className="table-description bold">
                    <p className="top text-center">$0<span className="light">/month</span></p>
                    <p className="bottom text-justify">You would normally pay an OTA <span className="red bold">$336</span> in commission</p>
                    <button type="button" className="btn btn-primary btn-lg btn-free text-center">sing up</button>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3 col-lg-3 table-element black">
                <div className="element">
                  <p className="table-title text-center bold">6 - 10 bookings/<span className="light">month</span></p>
                  <div className="table-description bold">
                    <p className="top text-center">$50<span className="light">/month</span></p>
                    <p className="bottom text-justify">You would normally pay an OTA <span className="red bold">$672</span> in commission</p>
                    <button type="button" className="btn btn-primary btn-lg btn-free text-center">sing up</button>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3 col-lg-3 table-element black">
                <div className="element">
                  <p className="table-title text-center bold">11 - 15 bookings/<span className="light">month</span></p>
                  <div className="table-description bold">
                    <p className="top text-center">$100<span className="light">/month</span></p>
                    <p className="bottom text-justify">You would normally pay an OTA <span className="red bold">$1,008</span> in commission</p>
                    <button type="button" className="btn btn-primary btn-lg btn-free text-center">sing up</button>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3 col-lg-3 table-element black">
                <div className="element">
                  <p className="table-title text-center bold">15 infinity/<span className="light">month</span></p>
                  <div className="table-description bold">
                    <p className="top text-center">$200<span className="light">/month</span></p>
                    <p className="bottom text-justify">You would normally pay an OTA <span className="red bold">$2,208</span> in commission</p>
                    <button type="button" className="btn btn-primary btn-lg btn-free text-center">sing up</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Price
