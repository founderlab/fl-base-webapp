
export function submitLogin(email) {
  return {
    type: 'LOGIN',
    payload: {
      email,
      date: Date.now()
    }
  }
}

export function logout() {
  return {
    type: 'LOGOUT',
    payload: {date: Date.now()}
  }
}

export default {submitLogin, logout}
