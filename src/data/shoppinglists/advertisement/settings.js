import useSWR from 'swr'
import { SHOPPINGLISTS_API } from 'constants/url'
import api from '../../api'

export default function useSettings(participantId) {
  const { data, mutate, error } = useSWR(`${SHOPPINGLISTS_API}/advertisement/settings/${participantId}`, api.getFetcher)
  return {
    result: data && data.result,
    mutate,
    error
  }
}
