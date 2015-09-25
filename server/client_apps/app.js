import React from 'react'
import {RoutingContext, match} from 'react-router'
import createLocation from 'history/lib/createLocation'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import reducers from '../../shared/reducers'
import routes from '../../shared/routes'
import promiseMiddleware from '../../shared/middleware/promise_middleware'


export default function app(req, res) {

  const location = createLocation(req.url)
  const reducer = combineReducers(reducers)
  const store = applyMiddleware(promiseMiddleware)(createStore)(reducer)

  match({routes, location}, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err)
      return res.status(500).end('Internal server error')
    }
    if (!renderProps) return res.status(404).end('Not found')

    const InitialComponent = (
      <Provider store={store}>
        {() =>
          <RoutingContext {...renderProps} />
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
