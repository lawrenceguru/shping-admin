import axios from 'axios'
import { store } from '../index'

const getFetcher = path => {
  const states = store.getState()
  const { ticket } = states.identity
  const config = {
    url: path,
    method: 'GET',
    headers: { authenticateit_identity_ticket: ticket }
  }
  return axios(config).then(response => response.data)
}

const postFetcher = async (path, data) => {
  const states = store.getState()
  const { ticket } = states.identity
  const config = {
    url: path,
    method: 'POST',
    data,
    headers: { authenticateit_identity_ticket: ticket }
  }
  return axios(config).then(response => response.data)
}

const encodeQueryData = data => {
  const ret = []
  if (data === undefined) return ''
  const keys = Object.keys(data)
  const values = Object.values(data)
  for (let i = 0; i < keys.length; i += 1) {
    if (values[i] !== undefined) ret.push(`${encodeURIComponent(keys[i])}=${encodeURIComponent(values[i])}`)
  }
  return ret.join('&')
}

export default { getFetcher, encodeQueryData, postFetcher }
