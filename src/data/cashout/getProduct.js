import { INDEX_API } from 'constants/url'
import api from '../api'

const getProduct = async val => {
  // const { data, mutate, error } = useSWR(`${IDENTITY_API}/user/transactions`, api.postFetcher)
  const res = {
    op: 'OR',
    order: 'id',
    query: `id=like=|${val}|`,
    take: 1,
    type: 'data'
  }
  const data = api.postFetcher(`${INDEX_API}/rsql/index_schema_table_gtin_1`, res)
  return data
}

export default getProduct
