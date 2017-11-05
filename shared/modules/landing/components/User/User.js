import React, {Component} from 'react'
import Bookings from './Shopping/ShoppingContainer'
import Specification from './Specification/Specification'
import CheaperPrice from './CheaperPrice/CheaperPrice'
import Reviews from './Reviews/Reviews'
import Partners from './Partners/Partners'
import './User.css'

class Hotel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main className="container-fluid main-container">
        <Bookings />
        <Specification />
        <CheaperPrice />
        <Reviews />
        <Partners />
      </main>
    )
  }
}

export default Hotel
