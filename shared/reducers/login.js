import Immutable from 'immutable'

const default_state = new Immutable.Map()

export default function loginReducer(state=default_state, action={}) {

  switch(action.type) {
    case 'LOGIN':
      let s = state.set('email', action.payload.email)
      return s
    case 'LOGOUT':
      return state.delete('email')
    default:
      return state
  }

}
