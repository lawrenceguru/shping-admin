import useSWR from 'swr'
import { BILLING_API } from 'constants/url'
import api from '../api'

export default function useTariff(participant, tariffId) {
  const { data, mutate, error } = useSWR(`${BILLING_API}/tariff/${participant}/${tariffId}`, api.getFetcher)
  return {
    data,
    tariff: data?.result,
    mutate,
    error
  }
}
