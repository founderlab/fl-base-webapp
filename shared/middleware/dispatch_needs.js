import {ROUTER_DID_CHANGE} from 'redux-router/lib/constants'
import dispatchNeeds from '../lib/dispatch_needs'

const locsEqual = (loc_a, loc_b) => (loc_a.pathname === loc_b.pathname) && (loc_a.search === loc_b.search)

export default store => next => action => {
  const router = store.getState().router
  if (action.type === ROUTER_DID_CHANGE && router && !locsEqual(action.payload.location, router.location)) {
    const {components} = action.payload
    dispatchNeeds({store, components})
  }
  next(action)
}
