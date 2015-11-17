import Queue from 'queue-async'
import React from 'react'
import {renderToString} from 'react-dom/server'
import createHistory from 'history/lib/createMemoryHistory'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import {reduxReactRouter, match} from 'redux-router/server'

import config from '../config'
import createStore from '../../shared/create_store'
import getRoutes from '../../shared/routes'

import Group from '../models/group'
import admin from '../../shared/admin'
admin({models: [Group]})

function load(components, dispatch, callback) {
  const queue = new Queue()

  components.forEach(coco => {
    const component = coco.WrappedComponent || coco
    if (!component.preloadActions || !component.preloadActions().length) return

    component.preloadActions().forEach(action => {
      queue.defer(callback => dispatch(action({}, callback)))
    })
  })

  queue.await(callback)
}

export default function app(req, res) {

  const scripts = ['commons.js', 'app.js']
  const server_state = {
    config,
    auth: req.user ? {email: req.user.get('email')} : {},
  }
  const store = createStore(reduxReactRouter, getRoutes, createHistory, server_state)

  store.dispatch(match(req.originalUrl, (err, redirect_location, router_state) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Internal server error')
    }
    if (!router_state) return res.status(404).send('Not found')
    if (redirect_location) return res.redirect(redirect_location.pathname + redirect_location.search)

    load(router_state.components, store.dispatch, (err) => {
      if (err) {
        console.log(err)
        return res.status(500).send('Internal server error')
      }

      // https://github.com/rackt/redux-router/issues/106
      router_state.location.query = req.query

      const component_html = renderToString(
        <Provider store={store} key="provider">
          <ReduxRouter />
        </Provider>
      )
      const initial_state = store.getState()

            // <link rel="stylesheet" media="all" href="/bootstrap/css/bootstrap.css">
      const script_tags = scripts.map(script => `<script type="application/javascript" src="/public/${script}"></script>`).join('\n')

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
            ${script_tags}
          </body>
        </html>
      `

      res.type('html').send(HTML)
    })
  }))
}
