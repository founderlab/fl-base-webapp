import React from 'react'
import {renderToString} from 'react-dom/server'
import {RoutingContext, match} from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {fromJS} from 'immutable'
import requestMiddleware from 'redux-request-middleware'

import config from '../config'
import reducers from '../../shared/reducers'
import routes from '../../shared/routes'

export default function app(req, res) {

  const history = createMemoryHistory()
  const location = history.createLocation(req.url)
  const reducer = combineReducers(reducers)

  const server_state = {
    auth: fromJS(req.user ? {email: req.user.get('email')} : {}),
    config: fromJS(config),
    query: fromJS(req.query),
  }
  const store = applyMiddleware(thunk, requestMiddleware)(createStore)(reducer, server_state)

  match({routes, location}, (err, redirect_location, render_props) => {
    if (err) {
      console.error(err)
      return res.status(500).end('Internal server error')
    }
    if (!render_props) return res.status(404).end('Not found')

    const component_html = renderToString(
      <Provider store={store}>
        <RoutingContext {...render_props} />
      </Provider>
    )

    const initial_state = store.getState()

          // <link rel="stylesheet" media="all" href="/bootstrap/css/bootstrap.css">
    const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>FounderLab_replaceme></title>
          <script type="application/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initial_state)}
          </script>
        </head>
        <body id="app">
          <div id="react-view">${component_html}</div>
          <script type="application/javascript" src="/commons.chunk.js"></script>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
    `

    res.type('html').send(HTML)
  })
}
