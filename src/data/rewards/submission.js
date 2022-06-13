import useSWR from 'swr'
import { REWARDS_API } from 'constants/url'
import api from '../api'

export default function useCashbackSubmission(id) {
  const { data, mutate, error } = useSWR([`${REWARDS_API}/cashbacks/submissions/get`, id], url =>
    api.postFetcher(url, { id })
  )
  return {
    submission: data,
    mutate,
    error
  }
}
