
export default function requestMiddleware() {
  return next => action => {
    const {request, type, ...rest} = action

    if (!request) return next(action)

    const SUCCESS = type
    const REQUEST = type + '_REQUEST'
    const FAILURE = type + '_FAILURE'
    next({ ...rest, type: REQUEST })

    return request.end((err, res) => {
      if (err) {
        console.log('Error processing request:', err)
        return next({error: err, type: FAILURE, ...rest})
      }
      next({res, type: SUCCESS, ...rest})
    })
  }
}
