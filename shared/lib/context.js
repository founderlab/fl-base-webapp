import warning from 'warning'

export default function context({auth, startups, profiles, router}, action) {
  const params = (action && action.payload && action.payload.params) || (router && router.params) || {}

  const context = {
    user: auth.get('user').toJSON(),
    activeProfileIm: profiles.get('active'),
  }
  context.activeProfile = context.activeProfileIm && context.activeProfileIm.toJSON()

  if (params.profileId) {
    if (!profiles) warning(false, 'lib/context: profiles store missing from context when profileId param is present')
    context.profileId = params.profileId
    context.profileIm = profiles && profiles.get('models').get(context.profileId)
    context.profile = context.profileIm && context.profileIm.toJSON()
  }
  else {
    context.profileId = false
    context.profileIm = context.activeProfileIm
    context.profile = context.activeProfile
  }

  return context
}

export function profileFromParams({auth, profiles, router, userId, profileId, profileSlug}, action, defaultToCurrentUser) {
  if (!profiles) {
    warning(false, 'profileFromParams: profiles store missing from context when profileId param is present')
    return {}
  }
  const params = (action && action.payload && action.payload.params) || (router && router.params) || {}
  const context = {}
  context.userId = userId || params.userId
  context.profileSlug = profileSlug || params.profileSlug
  context.profileId = profileId || params.profileId || context.profileSlug && profiles.get('bySlug').get(context.profileSlug)

  if (!context.userId) {
    if (context.profileId && profiles.get('models').get(context.profileId)) {
      context.userId = profiles.get('models').get(context.profileId).get('user_id')
    }
    else if (defaultToCurrentUser) {
      if (!auth) {
        warning(false, 'profileFromParams: the defaultToCurrentUser option requires the auth store to be provided')
        return context
      }
      context.userId = auth.get('user').get('id')
    }
    else {
      return context
    }
  }

  context.profileId = context.profileId || profiles.get('byUser').get(context.userId.toString())
  if (context.profileId) {
    context.profileIm = profiles.get('models').get(context.profileId.toString())
    context.profile = context.profileIm && context.profileIm.toJSON()
  }
  return context
}
