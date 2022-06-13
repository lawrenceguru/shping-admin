import useSWR from 'swr'
import { PAYMENTS_API } from 'constants/url'
import api from '../api'

const limitList = id => {
  const { data, mutate, error } = useSWR([`${PAYMENTS_API}/coinbase/transfer/limits`, id], url =>
    api.postFetcher(url, { id })
  )
  return {
    result: data,
    mutate,
    error
  }
}

export default limitList
