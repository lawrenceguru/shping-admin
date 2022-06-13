import useSWR from 'swr'
import { IDENTITY_API } from 'constants/url'
import api from '../api'

const historyList = id => {
  // const { data, mutate, error } = useSWR(`${IDENTITY_API}/user/transactions`, api.postFetcher)
  const { data, mutate, error } = useSWR([`${IDENTITY_API}/user/transactions`, id], url => api.postFetcher(url, { id }))
  return {
    result: data,
    mutate,
    error
  }
}

export default historyList
