import Immutable from 'immutable'
import {reducer as auth} from 'fl-auth-redux'
import {reducer as form} from 'redux-form'

export default {
  auth,
  form,
  config: (state=new Immutable.Map()) => state,
  query: (state=new Immutable.Map()) => state,
}

