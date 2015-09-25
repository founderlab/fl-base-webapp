import Immutable from 'immutable'

const default_state = new Immutable.Map()

export default function loginReducer(state=default_state, action={}) {

  switch (action.type) {

    case 'REGISTER':
      console.log('REGISTER action:', action, action.res.data.email)
      const st = state.set('email', action.res.data.email)
      return st
    case 'LOGIN':
      const s = state.set('email', action.payload.email)
      return s
    case 'LOGOUT':
      return state.delete('email')
    default:
      return state

  }

}
