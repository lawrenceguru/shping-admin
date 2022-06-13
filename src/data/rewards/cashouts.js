import useSWR from 'swr'
import { REWARDS_API } from 'constants/url'
import api from '../api'

export default function useCashout(offset, limit, sortBy, sortType, status) {
  const { data, mutate, error } = useSWR([`${REWARDS_API}/boosters`, offset, limit, sortBy, sortType, status], url => {
    if (sortBy)
      return api.getFetcher(
        `${url}?offset=${offset}&limit=${limit}&sort_by=${sortBy}&sort_type=${sortType}&status=${status}`
      )
    return api.getFetcher(`${url}?offset=${offset}&limit=${limit}&status=${status}`)
  })
  return {
    data,
    cashouts: data && data.data,
    total: data && data.count,
    mutate,
    error
  }
}
