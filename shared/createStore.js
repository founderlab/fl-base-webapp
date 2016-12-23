import _ from 'lodash' // eslint-disable-line
import {createStore as _createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {requestMiddleware, responseParserMiddleware, createRequestModifierMiddleware} from 'redux-request-middleware'
import {fetchComponentDataMiddleware} from 'fetch-component-data'
import {fromJS} from 'immutable'

const MUTABLES = {
  router: 'always',
  admin: 1,
}

function immute(fromObj, parentKey, depth=0) {
  const obj = {}

  Object.keys(fromObj).forEach(key => {
    const mutableKey = parentKey || key
    const immuteAt = MUTABLES[mutableKey]

    if (!immuteAt || immuteAt === depth) {
      obj[key] = fromJS(fromObj[key])
    }
    else if (immuteAt > depth) {
      obj[key] = immute(fromObj[key], mutableKey, depth+1)
    }
    else obj[key] = fromObj[key]
  })

  return obj
}

const requestModifierMiddleware = createRequestModifierMiddleware({
  getValue: store => {
    const {auth} = store.getState()
    const value = {}
    if (auth.get('user')) value.$user_id = auth.get('user').get('id')
    return value
  },
})

// Scroll to the top of the app container when the route changes
const locsEqual = (locA, locB) => (locA.pathname === locB.pathname) && (locA.search === locB.search)
const scrollMiddleware = store => next => action => {
  const router = store.getState().router
  const ROUTER_DID_CHANGE = '@@reduxReactRouter/routerDidChange'
  if (typeof window === 'object' && action.type === ROUTER_DID_CHANGE && router && !locsEqual(action.payload.location, router.location)) {
    const scrollEle = document.getElementsByClassName('app-content')[0]
    if (scrollEle) scrollEle.parentElement.scrollTop = 0
  }
  next(action)
}

export default function createStore(reduxReactRouter, getRoutes, createHistory, _initialState) {
  const reducer = require('./reducer') // delay requiring reducers until needed
  const middlewares = applyMiddleware(
    thunk,
    requestModifierMiddleware,
    requestMiddleware,
    responseParserMiddleware,
    fetchComponentDataMiddleware,
    scrollMiddleware,
  )
  const finalCreateStore = compose(
    reduxReactRouter({getRoutes, createHistory}),
    middlewares,
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
  )(_createStore)

  const initialState = immute(_initialState)
  const store = finalCreateStore(reducer, initialState)
  return store
}
