import useSWR from 'swr'
import { SHOPPINGLISTS_API } from 'constants/url'
import api from '../../api'

export default function useAds(offset, limit, id) {
  const { data, mutate, error } = useSWR([`${SHOPPINGLISTS_API}/advertisement`, offset, limit, id], url =>
    api.postFetcher(url, { offset, limit, id })
  )
  return {
    data,
    ads: data && data.result,
    total: data && data.total,
    mutate,
    error
  }
}
