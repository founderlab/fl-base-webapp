import _ from 'lodash'
import warning from 'warning'
import {PropTypes} from 'react'
import {Route, PropTypes as RouterPropTypes} from 'react-router'
import {createRoutesFromReactChildren} from 'react-router/lib/RouteUtils'

import {model_admins} from './index'
import AdminHome from './containers/home'
import List from './containers/list'

function checkPropTypes(componentName='UnknownComponent', prop_types, props) {
  for (const prop_name in prop_types) {
    if (prop_types.hasOwnProperty(prop_name)) {
      const error = prop_types[prop_name](props, prop_name, componentName)
      if (error instanceof Error) warning(false, error.message)
    }
  }
}

export class Admin {

  constructor(options) {
    _.extend(this, options)
    if (!this.component) this.component = AdminHome
  }

  getChildRoutes(location, callback) {

    if (!this.child_routes) {
      this.child_routes = []

      console.log('model_admins', model_admins)

      model_admins.forEach(model_admin => {
        this.child_routes.push({
          path: model_admin.path,
          component: List,
        })
      })
    }

    console.log('this.child_routes', this.child_routes)

    callback(null, this.child_routes)
  }

  // getComponents(location, callback) {
  //   console.log('getcomp')
  //   callback(null, AdminHome)
  // }

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

    const route = new Admin(props)

console.log('adminroute is ', route)
    return route
  }

}
