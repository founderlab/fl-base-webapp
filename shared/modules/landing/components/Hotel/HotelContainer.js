import {connect} from 'react-redux'

import Hotel from './Hotel'

const mapStateToProps = ({app: {}}, ownProps) => {
  return {
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch) => {
}

const HotelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hotel)

export default HotelContainer
