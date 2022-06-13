import useSWR from 'swr'
import { REWARDS_API } from 'constants/url'
import api from '../api'

export default function useCashback(id) {
  const { data, mutate, error } = useSWR([`${REWARDS_API}/cashbacks`, id], url => api.getFetcher(`${url}/${id}`))
  return {
    cashback: data,
    mutate,
    error
  }
}
