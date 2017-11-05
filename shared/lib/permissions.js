import _ from 'lodash'

export function userPermissions(props) {
  const {auth, profile} = props
  const user = props.user || auth.get('user') && auth.get('user').toJSON()
  if (!user) return {}
  return {
    globalAdmin: user.admin,
    profileOwner: profile && (user.id === profile.user_id),
  }
}

export function hotelPermissions(props) {
  const {auth, hotel, hotels} = props
  const user = props.user || auth.get('user') && auth.get('user').toJSON()

  const hotelId = props.hotelId || (hotel && hotel.id) || hotel ||
                         (hotels && hotels.get('active') && hotels.get('active').get('id'))
  if (!hotelId) return {}

  return {
    hotelAdmin: user.hotel_id === hotelId && user.hotelAdmin,
  }
}

export function permissions(props) {
  return _.merge(
    userPermissions(props),
    hotelPermissions(props)
  )
}

/*
 * User profile permissions
 */
export function userCanEditProfile(...args) {
  const userIs = permissions(...args)
  return !!(userIs.globalAdmin || userIs.profileOwner)
}

/*
 * Hotel permissions
 */
export function userCanEditHotel(...args) {
  const userIs = permissions(...args)
  return !!(userIs.globalAdmin || userIs.hotelAdmin)
}
