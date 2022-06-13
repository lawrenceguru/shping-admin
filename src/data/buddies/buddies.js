import useSWR from 'swr'
import { BUDDIES_API } from 'constants/url'
import api from '../api'

export default function useGenders() {
  const { data, mutate, error } = useSWR(`${BUDDIES_API}/buddies`, url => api.getFetcher(url))
  return {
    buddies: data,
    mutate,
    error
  }
}
