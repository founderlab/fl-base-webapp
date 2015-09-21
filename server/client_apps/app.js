import React from 'react'
import {Router} from 'react-router'
import Location from 'react-router/lib/Location'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

import reducers from '../../shared/reducers'
import routes from '../../shared/routes'

export default function app(req, res) {

  const location = new Location(req.path, req.query)
  const reducer = combineReducers(reducers)
  const store = createStore(reducer)

  Router.run(routes, location, (err, route_state) => {
    if (err) return console.error(err)
    if (!route_state) return res.status(404).end('404')

    const InitialComponent = (
      <Provider store={store}>
        {() =>
          <Router {...route_state} />
        }
      </Provider>
    )
    const component_html = React.renderToString(InitialComponent)
    const initial_state = store.getState()

    const HTML = `
     <!DOCTYPE html>
     <html>
       <head>
         <meta charset="utf-8">
         <title>FounderLab_replaceme></title>
         <link rel="stylesheet" media="all" href="/bootstrap/css/bootstrap.css">
         <script type="application/javascript">
           window.__INITIAL_STATE__ = ${JSON.stringify(initial_state)}
         </script>
       </head>
       <body>
         <div id="react-view">${component_html}</div>
         <script type="application/javascript" src="/bundle.js"></script>
       </body>
     </html>
    `

    res.end(HTML)
  })
}
