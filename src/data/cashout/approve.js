import { PAYMENTS_API } from 'constants/url'
import api from '../api'

const approve = async id => {
  const data = await api.postFetcher(`${PAYMENTS_API}/coinbase/transfer/approve`, { id })
  return {
    rejectResult: data
  }
}
export default approve
