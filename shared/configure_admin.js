import loadModel from '../server/client_apps/load_model'
import admins from './admins'
import admin from './admin'

admin({loadModel, models: admins})
