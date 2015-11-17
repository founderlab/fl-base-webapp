import _ from 'lodash'

export default function createModelActions(model_admin) {
  const actionType = name => `${model_admin.action_type}_${name.toUpperCase()}`
  const model_type = model_admin.model_type

  return {
    loadOne: (query={}, callback) => {
      query.$one = true
      return {
        type: actionType('load'),
        request: model_type.cursor(query),
        callback,
      }
    },

    load: (query, callback) => {
      return {
        type: actionType('load_collection'),
        request: model_type.cursor(query),
        parseResponse: res => {
          const map = {}
          if (!res.body) return map
          _.forEach(res.body, model => map[model.id] = model)
          return map
        },
        callback,
      }
    },

    save: (data, callback) => {
      return {
        type: actionType('save'),
        request: (new model_type(data)).save,
        parseResponse: res => res && res.toJSON(),
        callback,
      }
    },

    del: (data, callback) => {
      const deleted_id = data.id
      return {
        type: actionType('del'),
        request: (new model_type({id: data.id})).destroy,
        parseResponse: () => ({deleted_id}),
        callback,
      }
    },

  }
}
