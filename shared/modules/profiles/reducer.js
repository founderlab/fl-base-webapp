import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'
import {createGroupByReducer, createPaginationReducer} from 'fl-redux-utils'
import {TYPES} from './actions'

const byUser = createGroupByReducer([TYPES.PROFILE_LOAD + '_SUCCESS'], profile => profile.user_id, {single: true})
const bySlug = createGroupByReducer([TYPES.PROFILE_LOAD + '_SUCCESS'], profile => profile.slug, {single: true})
const byOrganisation = createGroupByReducer([TYPES.PROFILE_LOAD + '_SUCCESS'], profile => profile.organisation_id)
const byParentOrganisation = createGroupByReducer([TYPES.PROFILE_LOAD + '_SUCCESS'], profile => profile.organisation && profile.organisation.parentOrganisationName)
const pagination = createPaginationReducer('PROFILE')

const defaultState = fromJS({
  loading: false,
  errors: {},

  models: {},
  active: null,
  pagination: pagination(),
  byUser: byUser(),
  bySlug: bySlug(),
  byOrganisation: byOrganisation(),
  places: {citiesByCountry: [], timestamp: null},
  landingModels: [],

  subscriptionList: {},
  subscriptions: {},
  subscriptionsLoading: false,
  subscriptionsLoaded: false,
})

export default function reducer(state=defaultState, action={}) {

  switch (action.type) {
    case TYPES.PROFILE_LOAD + '_START':
    case TYPES.PROFILE_SAVE + '_START':
      return state.merge({loading: true, errors: {}})

    case TYPES.PROFILE_LOAD + '_ERROR':
      return state.merge({loading: false, errors: {load: action.error}})
    case TYPES.PROFILE_SAVE + '_ERROR':
      return state.merge({loading: false, errors: {save: action.error}})

    case TYPES.PROFILE_LOAD + '_SUCCESS':
      const profiles = action.models
      const merge = {}
      const mergeDeep = {
        models: profiles,
      }
      if (action.active) {
        mergeDeep.active = action.model
      }
      if (action.landing) {
        merge.landingModels = action.modelList
      }
      return state.merge({
        loading: false,
        errors: {},
        byUser: byUser(state.get('byUser'), action),
        bySlug: bySlug(state.get('bySlug'), action),
        byOrganisation: byOrganisation(state.get('byOrganisation'), action),
        byParentOrganisation: byParentOrganisation(state.get('byParentOrganisation'), action),
        pagination: pagination(state.get('pagination'), action),
        ...merge,
      }).mergeDeep(mergeDeep)

    case TYPES.PROFILE_COUNT + '_SUCCESS':
      return state.merge({
        pagination: pagination(state.get('pagination'), action),
      })

    case TYPES.PROFILE_SAVE + '_SUCCESS':
      const profile = action.model
      const saveMerge = {
        models: state.get('models').merge({[profile.id]: profile}),
      }
      // Update the active profile if it matches
      if (profile.id === state.get('active').get('id')) {
        saveMerge.active = profile
      }
      return state.merge({loading: false, errors: {}}).merge(saveMerge)

    // Special case for agent registrations, action located in modules/users/actions
    case 'REGISTER_SUCCESS':
      const agentProfile = action.model.profile
      const sm = {
        active: agentProfile,
        models: state.get('models').merge({[agentProfile.id]: agentProfile}),
      }
      return state.merge({loading: false, errors: {}}).merge(sm).mergeDeep({
        byUser: state.get('byUser').merge({[agentProfile.user_id]: agentProfile.id}),
        bySlug: state.get('bySlug').merge({[agentProfile.slug]: agentProfile.id}),
        byOrganisation: state.get('byOrganisation').mergeDeep({[agentProfile.organisation_id]: [agentProfile.id]}),
        byParentOrganisation: state.get('byParentOrganisation').mergeDeep({[agentProfile.organisation && agentProfile.organisation.parentOrganisationName]: [agentProfile.id]}),
      })

    case TYPES.PLACE_LOAD + '_SUCCESS':
      return state.merge({
        places: {
          citiesByCountry: action.model,
          timestamp: new Date().getTime(),
        },
      })

    default:
      return state
  }
}
