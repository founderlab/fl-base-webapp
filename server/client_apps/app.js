import React from 'react'
import {renderToString} from 'react-dom/server'
import createHistory from 'history/lib/createMemoryHistory'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import {reduxReactRouter, match} from 'redux-router/server'

import config from '../config'
import createStore from '../../shared/create_store'
import getRoutes from '../../shared/routes'

export default function app(req, res) {

  const app_name = 'app'

  const server_state = {
    config,
    auth: req.user ? {email: req.user.get('email')} : {},
    query: req.query,
  }
  const store = createStore(reduxReactRouter, getRoutes, createHistory, server_state)

  store.dispatch(match(req.originalUrl, (err, redirect_location, router_state) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Internal server error')
    }
    if (!router_state) return res.status(404).send('Not found')

    if (redirect_location) return res.redirect(redirect_location.pathname + redirect_location.search)


          //todo: is this needed?
    // Workaround redux-router query string issue:
    // https://github.com/rackt/redux-router/issues/106
    // if (router_state.location.search && !router_state.location.query) router_state.location.query = qs.parse(router_state.location.search)

    const component_html = renderToString(
      <Provider store={store} key="provider">
        <ReduxRouter />
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
          <script type="application/javascript" src="/${app_name}.js"></script>
        </body>
      </html>
    `

    res.type('html').send(HTML)
  }))
}
