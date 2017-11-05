import {connect} from 'react-redux'

import User from './User'

const mapStateToProps = ({app: {}}, ownProps) => {
  return {
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
}

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

export default UserContainer
