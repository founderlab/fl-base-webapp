import _ from 'lodash'
import {PropTypes} from 'react'
import {Route, PropTypes as RouterPropTypes} from 'react-router'
import {createRoutesFromReactChildren} from 'react-router/lib/RouteUtils'

import {model_admins} from './index'
import AdminApp from './containers/app'
import AdminHome from './containers/home'
import generateDetailContainer from './containers/generators/detail'
import generateListContainer from './containers/generators/list'
import {checkPropTypes} from './lib'


export class AdminRoot {
  constructor(options) {
    _.extend(this, options)
    if (!this.component) this.component = AdminApp
    this.indexRoute = {component: AdminHome}
  }

  getChildRoutes(location, callback) {

    if (!this.child_routes) {
      this.child_routes = []

      model_admins.forEach(model_admin => {
        this.child_routes.push(model_admin.list_route || {
          path: model_admin.path,
          component: model_admin.list_component || generateListContainer(model_admin),
        })
        this.child_routes.push(model_admin.detail_route || {
          path: `${model_admin.path}/:id`,
          component: model_admin.detail_component || generateDetailContainer(model_admin),
        })
      })
    }

    callback(null, this.child_routes)
  }
}

export default class AdminRoute extends Route {

  static prop_types = {
    path: PropTypes.string,
    getComponent: PropTypes.func,
    getComponents: PropTypes.func,
    component: RouterPropTypes.component,
    components: RouterPropTypes.components,
  }

  static createRouteFromReactElement(element/*, parent*/) {
    const type = element.type
    const props = _.extend({}, element.type.defaultProps, element.props)

    if (type.prop_types) checkPropTypes(type.displayName || type.name, type.prop_types, props)

    if (props.children) {
      const child_routes = createRoutesFromReactChildren(props.children, props)
      if (child_routes.length) props.child_routes = child_routes
      delete props.children
    }

    return new AdminRoot(props)
  }
}
