import useSWR from 'swr'
import { SETTINGS_API } from 'constants/url'
import api from '../../api'

export default function useCountries() {
  const { data, mutate, error } = useSWR(`${SETTINGS_API}/agt/countries`, api.postFetcher)
  return {
    result: data?.data,
    mutate,
    error
  }
}
