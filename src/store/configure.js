/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { addFormSubmitSagaTo } from 'redux-form-submit-saga'

import middlewares from './middlewares'
import rootReducer from './reducers'
import rootSaga from './sagas'

export default function configureStore(initialState, history) {
  const isProduction = process.env.NODE_ENV === 'production'
  const loggerMiddleware = createLogger({ collapsed: true })
  const sagaMiddleware = createSagaMiddleware()
  const enhancers = [routerMiddleware(history), ...middlewares, sagaMiddleware]

  if (!isProduction) enhancers.push(loggerMiddleware)

  const store = createStore(rootReducer(history), initialState, composeWithDevTools(applyMiddleware(...enhancers)))

  const newRootSaga = addFormSubmitSagaTo(rootSaga)

  sagaMiddleware.run(newRootSaga)

  function selectTicket(state) {
    if (state.identity) {
      return state.identity.ticket
    }
    return null
  }

  let currentTicket = null
  function handleChange() {
    const previousTicket = currentTicket
    currentTicket = selectTicket(store.getState())

    if (previousTicket !== currentTicket && currentTicket !== null) {
      const now = new Date()
      now.setMinutes(now.getMinutes() + 15)
    }
  }

  store.subscribe(handleChange)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
