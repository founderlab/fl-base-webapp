import _ from 'lodash'

export default function createModelActions(model_admin) {
  const actionType = name => `${model_admin.action_type}_${name.toUpperCase()}`
  const model_type = model_admin.model_type

  return {
    loadOne: (query={}, callback) => {
      query.$one = true
      return {
        type: actionType('load_one'),
        request: model_type.cursor(query),
        callback,
      }
    },

    load: (query, callback) => {
      return {
        type: actionType('load'),
        request: model_type.cursor(query),
        parseResponse: action => {
          const by_id = {}
          const models = action.res ? action.res.body || action.res : []
          _.forEach(models, model => by_id[model.id] = _.omit(model, '_rev'))
          return {by_id, ...action}
        },
        callback,
      }
    },

    save: (data, callback) => {
      const model = new model_type(data)
      return {
        type: actionType('save'),
        request: model.save.bind(model),
        parseResponse: action => {
          const model_json = action.res ? action.res.toJSON() : {}
          action.by_id = {[model_json.id]: model_json}
          return action
        },
        callback,
      }
    },

    del: (data, callback) => {
      const model = new model_type(data)
      return {
        type: actionType('del'),
        request: model.destroy.bind(model),
        parseResponse: action => ({model_id: model.id, ...action}),
        callback,
      }
    },

  }
}
