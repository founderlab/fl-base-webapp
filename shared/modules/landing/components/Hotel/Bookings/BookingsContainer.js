import {connect} from 'react-redux'

import Bookings from './Bookings'

const mapStateToProps = ({app: {}}, ownProps) => {
  return {
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
}

const BookingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookings)

export default BookingsContainer
