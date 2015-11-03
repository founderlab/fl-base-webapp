import React from 'react'
import {renderToString} from 'react-dom/server'
import {RoutingContext, match} from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import {Provider} from 'react-redux'

import config from '../config'
import createStore from '../../shared/lib/create_store'
import routes from '../../shared/routes'

export default function app(req, res) {

  const history = createMemoryHistory()
  const location = history.createLocation(req.url)

  const server_state = {
    config,
    auth: req.user ? {email: req.user.get('email')} : {},
    query: req.query,
  }

  const store = createStore(server_state)


  // store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
  //   if (redirectLocation) {
  //     res.redirect(redirectLocation.pathname + redirectLocation.search);
  //   } else if (error) {
  //     console.error('ROUTER ERROR:', pretty.render(error));
  //     res.status(500);
  //     hydrateOnClient();
  //   } else if (!routerState) {
  //     res.status(500);
  //     hydrateOnClient();
  //   } else {
  //     // Workaround redux-router query string issue:
  //     // https://github.com/rackt/redux-router/issues/106
  //     if (routerState.location.search && !routerState.location.query) {
  //       routerState.location.query = qs.parse(routerState.location.search);
  //     }

  //     store.getState().router.then(() => {
  //       const component = (
  //         <Provider store={store} key="provider">
  //           <ReduxRouter/>
  //         </Provider>
  //       );

  //       const status = getStatusFromRoutes(routerState.routes);
  //       if (status) {
  //         res.status(status);
  //       }
  //       res.send('<!doctype html>\n' +
  //         ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
  //     }).catch((err) => {
  //       console.error('DATA FETCHING ERROR:', pretty.render(err));
  //       res.status(500);
  //       hydrateOnClient();
  //     });
  //   }














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
