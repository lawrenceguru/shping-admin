import useSWR from 'swr'
import { PAM_API } from 'constants/url'
import api from '../api'

export default function useGtins(search, limit = 10) {
  const { data, mutate, error } = useSWR([`${PAM_API}/api/gtins/search`, search, limit], url =>
    api.postFetcher(url, { search_string: search, limit })
  )
  return {
    gtins: data,
    mutate,
    error
  }
}
