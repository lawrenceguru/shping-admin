import useSWR from 'swr'
import { SETTINGS_API } from 'constants/url'
import api from '../api'

export default function useRetailers() {
  const { data, mutate, error } = useSWR(`${SETTINGS_API}/retailer_ocr_ids`, url => api.getFetcher(url))
  return {
    retailers: data && data.ocr_retailers,
    mutate,
    error
  }
}
