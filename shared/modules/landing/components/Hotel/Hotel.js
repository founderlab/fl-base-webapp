import React, {Component} from 'react'
import Bookings from './Bookings/BookingsContainer'
import Redirect from './Redirect/Redirect'
import Features from './Features/Features'
import Setup from './Setup/Setup'
import Price from './Price/Price'
import './Hotel.css'

class Hotel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main className="container-fluid main-container">
        <Bookings />
        <Redirect />
        <Features />
        <Setup />
        <Price />
      </main>
    )
  }
}

export default Hotel
