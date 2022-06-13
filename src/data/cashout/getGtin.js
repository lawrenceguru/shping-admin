import { INDEX_API } from 'constants/url'
import api from '../api'

const getGtin = async val => {
  // const { data, mutate, error } = useSWR(`${IDENTITY_API}/user/transactions`, api.postFetcher)
  const res = {
    query: `id=like=|${val}|;name=like=|${val}|`,
    op: 'or',
    type: 'data',
    // partner_brand: true,
    take: 10
  }
  const data = api.postFetcher(`${INDEX_API}/rsql/gtin`, res)
  return data
}

export default getGtin
