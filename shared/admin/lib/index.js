import warning from 'warning'

// yoinked from react-router
export function checkPropTypes(componentName='UnknownComponent', prop_types, props) {
  for (const prop_name in prop_types) {
    if (prop_types.hasOwnProperty(prop_name)) {
      const error = prop_types[prop_name](props, prop_name, componentName)
      if (error instanceof Error) warning(false, error.message)
    }
  }
}
