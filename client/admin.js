import render from './render'
import '../shared/configureAdmin'
import getRoutes from '../shared/routes'

import 'fl-admin/css/index.scss'
import 'quill/dist/quill.snow.css'

render(getRoutes)
