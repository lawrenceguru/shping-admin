// import { toast } from 'react-toastify'
import useSWR from 'swr'
import { PAYMENTS_API } from 'constants/url'
import api from '../api'
// const coinbaseList = async () => {
//   const data = await api.getFetcher(`${PAYMENTS_API}/coinbase/transfer/get`).catch(() => {
//     // toast.error('Invalid value for input parameter.')
//   })
//   return {
//     result: data
//   }
// }
const coinbaseList = () => {
  const { data, mutate, error } = useSWR(`${PAYMENTS_API}/coinbase/transfer/get`, api.postFetcher)
  return {
    result: data?.data,
    mutate,
    error
  }
}

export default coinbaseList
