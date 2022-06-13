import useSWR from 'swr'
import { DESCRIPTION_API } from 'constants/url'
import api from '../../api'

export default function useScans(analyzedReceiptId) {
  const { data, mutate, error } = useSWR(`${DESCRIPTION_API}/receipts/scans/${analyzedReceiptId}`, api.getFetcher)
  return {
    images: data && data.images,
    scans: data && data.scans,
    mutate,
    error
  }
}
