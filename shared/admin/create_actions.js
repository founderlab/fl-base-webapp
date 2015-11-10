export default function createModelActions(model_admin) {
  const actionType = name => model_admin.action_type + name.toUpperCase()

  return {
    load: (query, callback) => {
      return {
        type: actionType('load'),
        request: model_admin.model_type.get(query),
        callback,
      }
    },
  }
}
