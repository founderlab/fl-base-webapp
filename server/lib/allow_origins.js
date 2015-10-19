import _ from 'lodash'

function allowOrigin(app, url, origins) {
  app.all(url, (req, res, next) => {
    console.log("ADDORIGIN", app, url, origins)
    if (origins) res.set('Access-Control-Allow-Origin', origins)
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Disposition,Content-Type,Content-Description,Content-Range,X-CSRF-Token,Authorization')
    res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')

    if (req.method.toLowerCase() === 'options') return res.status(200).end()
    next()
  })
}

export default function allowOrigins(app, paths_, origins) {
  const paths = (_.isArray(paths)) ? paths_ : [paths_]
  paths.forEach(path => allowOrigin(app, path, origins))
}
