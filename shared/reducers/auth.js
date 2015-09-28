import Immutable from 'immutable'

const default_state = new Immutable.Map()

export default function loginReducer(state=default_state, action={}) {

  switch (action.type) {

    case 'REGISTER':
      console.log('REGISTER action:', action, action.res.data.user.email)
      const st = state.set('email', action.res.data.user.email)
      // location.assign('/home')
      return st
    case 'LOGIN':
      console.log('LOGIN action:', action, action.res.data.user.email)
      const s = state.set('email', action.res.data.user.email)
      return s
    case 'LOGOUT':
      return state.delete('email')
    default:
      return state

  }

}
