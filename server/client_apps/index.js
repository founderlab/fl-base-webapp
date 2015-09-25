import app from './app'

export default (options) => {
  if (!options.app) throw new Error('client_apps init: Missing app from options')
  options.app.get('*', app)
}
