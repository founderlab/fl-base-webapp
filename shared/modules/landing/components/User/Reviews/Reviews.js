import React, {Component} from 'react'
import './Reviews.css'
import OwlCarousel from 'react-owl-carousel2'

class Reviews extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const options = {
      nav: false,
      dots: true,
      rewind: false,
      autoplay: false,
      center: true,
      responsive: {
        0: {
          items: 1,
          loop: true,
          margin: 0,
        },
        780: {
          items: 2,
          loop: true,
          margin: 10,
        },
        1366: {
          items: 3,
          loop: false,
        }
      }
    }
    return (
      <section className="row with-background reviews-section">
        <h2 className="title text-center bold">What People Are Saying</h2>
        <div className="col-xs-12 col-left-z col-right-z">
          <OwlCarousel ref="reviews" options={options} >
            <div className="reviews-container">
              <div className="reviews-name"><h3 className="title">George Couda
                <span>
                  <i className="fa fa-star star-active" aria-hidden="true"></i>
                  <i className="fa fa-star star-active" aria-hidden="true"></i>
                  <i className="fa fa-star star-active" aria-hidden="true"></i>
                  <i className="fa fa-star star-deactive" aria-hidden="true"></i>
                  <i className="fa fa-star star-deactive" aria-hidden="true"></i>
                </span>
              </h3> </div>
              <div className="reviews-description">
                Frameworkstein saved me over $100 on my last trip. Their prices were cheaper than Expedia, Booking.com and Trivago. Also love how it doesn’t bother me unless it can really help.
              </div>
              <div className="reviews-store">From Chrome Store</div>
            </div>
            <div className="reviews-container">
              <div className="reviews-name"><h3 className="title">George Cound
                <span>
                  <i className="fa fa-star star-active" aria-hidden="true"></i>
                  <i className="fa fa-star star-active" aria-hidden="true"></i>
                  <i className="fa fa-star star-active" aria-hidden="true"></i>
                  <i className="fa fa-star star-active" aria-hidden="true"></i>
                  <i className="fa fa-star star-active" aria-hidden="true"></i>
                </span>
              </h3></div>
              <div className="reviews-description">
                Frameworkstein saved me over $100 on my last trip. Their prices were cheaper than Expedia, Booking.com and Trivago. Also love how it doesn’t bother me unless it can really help.
              </div>
              <div className="reviews-store">From Chrome Store</div>
            </div>
            <div className="reviews-container">
              <div className="reviews-name"><h3 className="title">Samantha H.
                <span>
                  <i className="fa fa-star star-deactive" aria-hidden="true"></i>
                  <i className="fa fa-star star-deactive" aria-hidden="true"></i>
                  <i className="fa fa-star star-deactive" aria-hidden="true"></i>
                  <i className="fa fa-star star-deactive" aria-hidden="true"></i>
                  <i className="fa fa-star star-deactive" aria-hidden="true"></i>
                </span>
              </h3></div>
              <div className="reviews-description">
                Frameworkstein saved me over $100 on my last trip. Their prices were cheaper than Expedia, Booking.com and Trivago. Also love how it doesn’t bother me unless it can really help.
              </div>
              <div className="reviews-store">From Chrome Store</div>
            </div>
          </OwlCarousel>
        </div>
      </section>
    )
  }
}

export default Reviews
