import React, {Component} from 'react'
import features from '/public/images/features.png'
import './Features.css'

class Features extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className="row with-background features-section">
        <div className="container">
          <div className="col-sm-12 col-md-7">
            <img src={features} alt="Frameworkstein Deal Found on Hotel Website"/>
          </div>
          <div className="col-sm-12 col-md-5 features-right">
            <h2 className="title bold">Don't just compete on price</h2>
            <div className="description-section black">
              <p className="description">
                We know hotels love to sweeten the deal for potential guests if they book direct.
              </p>
              <p className="description">
                We let you advertise your rewards for booking direct like free wi-fi, included breakfast and more!
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Features
