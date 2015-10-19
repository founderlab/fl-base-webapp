import Immutable from 'immutable'

const default_state = new Immutable.Map()

export default function config(state=default_state, action={}) {
  switch (action.type) {
    default:
      return state
  }
}
