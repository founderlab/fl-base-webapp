import inflection from 'inflection'

export function plural(model_type) {
  return inflection.pluralize(model_type.name)
}

export function upper(model_type) {
  return inflection.underscore(model_type.name).toUpperCase()
}

export function table(model_type) {
  return inflection.tableize(model_type.name)
}

