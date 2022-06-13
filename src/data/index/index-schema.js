import useSWR from 'swr'
import { INDEX_API } from 'constants/url'
import api from '../api'

export default function useSchemas() {
  const { data, mutate, error } = useSWR(`${INDEX_API}/index-schema`, api.getFetcher)
  return {
    schemas: data,
    mutate,
    error
  }
}
