import useSWR from 'swr'
import { PAYMENTS_API } from 'constants/url'
import api from '../api'

export default function billingPlans() {
  const { data, mutate, error } = useSWR(`${PAYMENTS_API}/billing_plans`, api.getFetcher)
  return {
    data,
    mutate,
    error
  }
}
