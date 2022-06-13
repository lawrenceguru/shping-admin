import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from 'store/configure'
import MainApp from 'components/MainApp'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

const history = createBrowserHistory()
// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({}, history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MainApp />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('shping-web-admin')
)

serviceWorker.unregister()
