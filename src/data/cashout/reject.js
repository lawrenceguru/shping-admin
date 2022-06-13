import { PAYMENTS_API } from 'constants/url'
import api from '../api'

const reject = async id => {
  const data = await api.postFetcher(`${PAYMENTS_API}/coinbase/transfer/reject`, { id })
  return {
    rejectResult: data
  }
}

export default reject
