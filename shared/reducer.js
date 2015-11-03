import Immutable from 'immutable'
import {combineReducers} from 'redux'
import {routerStateReducer as router} from 'redux-router'
import {reducer as auth} from 'fl-auth-redux'
import {reducer as form} from 'redux-form'

export default combineReducers({
  auth,
  form,
  router,
  config: (state=new Immutable.Map()) => state,
  query: (state=new Immutable.Map()) => state,
})
