import _ from 'lodash'
import {PropTypes} from 'react'
import {Route, PropTypes as RouterPropTypes} from 'react-router'
import {createRoutesFromReactChildren} from 'react-router/lib/RouteUtils'

import {model_admins} from './index'
import App from './components/app'
import ModelTypeList from './components/model_type_list'
import generateDetailContainer from './containers/generators/model_detail'
import generateListContainer from './containers/generators/model_list'
import {checkPropTypes} from './lib'

export default class AdminRoute extends Route {

  static propTypes = {
    path: PropTypes.string,
    getComponent: PropTypes.func,
    getComponents: PropTypes.func,
    component: RouterPropTypes.component,
    components: RouterPropTypes.components,
  }

  constructor(options) {
    super()
    _.extend(this, options)
    if (!this.component) this.component = App
    this.indexRoute = {component: ModelTypeList}
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

  // This method is used by react-router to go from a jsx entry to a route object
  // So we use it to check props and instantiate our base route
  static createRouteFromReactElement(element/*, parent*/) {
    const type = element.type
    const props = _.extend({}, element.type.defaultProps, element.props)

    if (type.propTypes) checkPropTypes(type.displayName || type.name, type.propTypes, props)

    if (props.children) {
      const child_routes = createRoutesFromReactChildren(props.children, props)
      if (child_routes.length) props.child_routes = child_routes
      delete props.children
    }
    return new AdminRoute(props)
  }
}
