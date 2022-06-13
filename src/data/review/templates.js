import useSWR from 'swr'
import { REVIEWS_API } from 'constants/url'
import api from '../api'

export default function useTemplates() {
  const { data, mutate, error } = useSWR(`${REVIEWS_API}/templates`, api.getFetcher)
  return {
    reviewTemplates: data && data.templates,
    mutate,
    error
  }
}
