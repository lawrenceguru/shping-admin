import useSWR from 'swr'
import { REWARDS_API } from 'constants/url'
import api from '../api'

export default function useCashbackSubmissions(deliveryId, offset, limit, sortBy, sortType) {
  const { data, mutate, error } = useSWR(
    [`${REWARDS_API}/cashbacks/submissions/get`, deliveryId.join(''), offset, limit, sortBy, sortType],
    url => {
      if (sortBy) {
        return api.postFetcher(url, {
          delivery_id: deliveryId,
          offset,
          limit,
          order_by: sortBy,
          order_type: sortType
        })
      }
      return api.postFetcher(url, {
        delivery_id: deliveryId,
        offset,
        limit
      })
    }
  )
  return {
    data,
    submissions: data && data.data,
    total: data && data.count,
    mutate,
    error
  }
}
