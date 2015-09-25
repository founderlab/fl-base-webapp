import request from 'axios'
const BACKEND_URL = '/register'

export function register(email, password) {
  return {
    type: 'REGISTER',
    promise: request.post(BACKEND_URL, {email, password}),
    payload: {
      email,
      password,
    },
  }
}

export function submitLogin(email, password) {
  return {
    type: 'LOGIN',
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
