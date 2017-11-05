import {connect} from 'react-redux'

import Shopping from './Shopping'

const mapStateToProps = ({app: {}}, ownProps) => {
  return {
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch) => {
}

const ShoppingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shopping)

export default ShoppingContainer
