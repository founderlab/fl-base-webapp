// import _ from 'lodash'

export const required = value => value ? undefined : 'Required'
export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const email = value =>
  value && !/^.+@.+\..+$/i.test(value) ?
  'Invalid email address' : undefined
