import Immutable from 'immutable'
import {combineReducers} from 'redux'
import {routerStateReducer as router} from 'redux-router'
import {reducer as auth} from 'fl-auth-redux'
import {reducer as form} from 'redux-form'
import {reducer as admin} from './admin'


// console.log('admin reducer is', admin)

// const default_state = new Immutable.Map()
// function cc(state=default_state, action={}) {
//   return state
// }

// console.log('cc is', cc)
// const combined = combineReducers({
//   groups: cc,
// })
// console.log('making our own got', combined)
// console.log('combinedrun', combined(undefined, {}))
export default combineReducers({
  auth,
  form,
  router,
  admin,
  // combined,
  config: (state=new Immutable.Map()) => state,
})
