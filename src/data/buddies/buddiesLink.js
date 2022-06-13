import useSWR from 'swr'
import { BUDDIES_API } from 'constants/url'
import api from '../api'

export default function useGenders() {
  const { data, mutate, error } = useSWR(`${BUDDIES_API}/buddies/link`, url => api.getFetcher(url))
  return {
    result: data,
    mutate,
    error
  }
}
