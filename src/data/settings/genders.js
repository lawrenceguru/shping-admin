import useSWR from 'swr'
import { SETTINGS_API } from 'constants/url'
import api from '../api'

export default function useGenders() {
  const { data, mutate, error } = useSWR(`${SETTINGS_API}/genders`, url => api.getFetcher(url))
  return {
    genders: data?.genders,
    mutate,
    error
  }
}
