import React, {Component} from 'react'
import './Partners.css'
import sydneylodges from '/public/images/partners/sydneylodges.png'
import veriu from '/public/images/partners/veriu.png'
import fshotel from '/public/images/partners/57hotel.png'
import quest from '/public/images/partners/quest.png'
import valuesuite from '/public/images/partners/valuesuite.png'
import unsw from '/public/images/partners/unsw.png'

class Partners extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className="row partners-section text-center">
        <div className="col-md-5">
          <div className="partners-left">
            <h3 className="title bold">100s of Hotels, & Growing Quickly</h3>
            <p className="description">We're partnering with 100s of hotels, and adding more everyday. We'll stay in ninja mode until we have a deal worth showing you.</p>
            <button type="button" className="btn btn-primary btn-lg btn-free">Install Now</button>
          </div>
        </div>
        <div className="col-md-7 partners-right">
          <div className="row right-list">
            <div className="col-xs-6 col-sm-6 col-md-4 list-element">
              <a href="#"><img src={sydneylodges} alt="Sydney Lodges"/></a>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-4 list-element">
              <a href="#"><img src={veriu} alt="Veriu"/></a>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-4 list-element">
              <a href=""><img className="partners-img-small" src={fshotel} alt="57 Hotel"/></a>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-4 list-element">
              <a href="#"><img src={quest} alt="Quest"/></a>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-4 list-element">
              <a href="#"><img src={valuesuite} alt="Value Suites"/></a>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-4 list-element">
              <a href="#"><img src={unsw} alt="UNSW Sydney"/></a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Partners
