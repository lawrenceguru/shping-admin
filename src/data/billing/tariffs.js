import useSWR from 'swr'
import { BILLING_API } from 'constants/url'
import api from '../api'

export default function useTariffs(participant) {
  const { data, mutate, error } = useSWR(`${BILLING_API}/tariff/${participant}`, api.getFetcher)
  return {
    data,
    tariffs: data?.result?.tariffs,
    mutate,
    error
  }
}
