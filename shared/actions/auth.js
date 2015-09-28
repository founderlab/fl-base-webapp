// import request from 'axios'
import request from 'superagent'

export function register(email, password) {
  return {
    type: 'REGISTER',
    // promise: request.post('/register', {email, password}),
    payload: {
      email,
      password,
    },
  }
}

export function submitLogin(email, password) {
  return {
    type: 'LOGIN',
    // promise: request.post('/login', {email, password}),
    payload: {
      email,
      password,
    },
  }
}

export function logout() {
  return {
    type: 'LOGOUT',
    payload: {},
  }
}

export default {register, submitLogin, logout}
