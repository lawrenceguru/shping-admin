import useSWR from 'swr'
import { SETTINGS_API } from 'constants/url'
import api from '../../api'

export default function useCities(country, state) {
  const { data, mutate, error } = useSWR([`${SETTINGS_API}/agt/cities`, country, state], url =>
    api.postFetcher(url, { country, state })
  )
  return {
    result: data?.data,
    mutate,
    error
  }
}
