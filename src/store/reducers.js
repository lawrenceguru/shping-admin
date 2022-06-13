import camelCase from 'lodash/camelCase'
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { connectRouter } from 'connected-react-router'

const reducers = {
  form
}

const req = require.context('.', true, /\.\/.+\/reducers\.js$/)

req.keys().forEach(key => {
  const storeName = camelCase(key.replace(/\.\/(.+)\/.+$/, '$1'))
  reducers[storeName] = req(key).default
})

export default history =>
  combineReducers({
    ...reducers,
    router: connectRouter(history)
  })
