import useSWR from 'swr'
import api from '../../api'

export default function useStores(path) {
  const { data, mutate, error } = useSWR(path, api.getFetcher)
  return {
    stores: data,
    mutate,
    error
  }
}
