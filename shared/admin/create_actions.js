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
      return {
        type: actionType('save'),
        request: (new model_type(data)).save,
        parseResponse: action => {
          if (action.res) action.res = action.res.toJSON()
          return action
        },
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
