import useSWR from 'swr'
import { PAM_API } from 'constants/url'
import api from '../api'

export default function useRetailers(country) {
  const { data, mutate, error } = useSWR(
    `${PAM_API}/api/v2/retailers?country_name=${country}&limit=100000`,
    api.getFetcher
  )
  // const { data, mutate, error } = useSWR(`${PAM_API}/api/v2/retailers?limit=100000`, api.getFetcher)
  return {
    retailers: data?.rows,
    mutate,
    error
  }
}
