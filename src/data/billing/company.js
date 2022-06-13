import useSWR from 'swr'
import { BILLING_API } from 'constants/url'
import api from '../api'

export default function useTariff(id) {
  const { data, mutate, error } = useSWR(`${BILLING_API}/billing/company/${id}`, api.getFetcher)
  return {
    data,
    mutate,
    error
  }
}
