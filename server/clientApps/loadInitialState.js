import _ from 'lodash' // eslint-disable-line

export default function loadInitialState(req) {
  const user = req.user

  const state = {
    auth: {},
  }

  if (user) {
    const links = {}
    _.forEach(user.links, link => links[link.id] = link)
    state.auth = {
      links,
      user: {id: user.id},
    }
  }

  if (req.csrfToken) {
    state.auth.csrf = req.csrfToken()
  }

  // Immutable.fromJS has a bug with objects flagged as anonymous in node 6
  // https://github.com/facebook/immutable-js/issues/1001
  return JSON.parse(JSON.stringify(state))
  // callback(null, state)
}
