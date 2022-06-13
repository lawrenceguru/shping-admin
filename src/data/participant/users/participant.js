import useSWR from 'swr'
import { PARTICIPANT_API } from 'constants/url'
import api from '../../api'

export default function useSettings() {
  const { data, mutate, error } = useSWR(`${PARTICIPANT_API}/users/participant`, api.getFetcher)
  return {
    result: data,
    mutate,
    error
  }
}
