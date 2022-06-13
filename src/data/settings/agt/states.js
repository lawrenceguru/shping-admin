import useSWR from 'swr'
import { SETTINGS_API } from 'constants/url'
import api from '../../api'

export default function useStates(country) {
  const { data, mutate, error } = useSWR([`${SETTINGS_API}/agt/states`, country], url =>
    api.postFetcher(url, { country })
  )
  return {
    result: data?.data,
    mutate,
    error
  }
}
