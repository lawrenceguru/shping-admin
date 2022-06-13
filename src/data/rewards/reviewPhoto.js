import useSWR from 'swr'
import { REWARDS_API } from 'constants/url'
import api from '../api'

export default function reviewPhoto() {
  const { data, mutate, error } = useSWR([`${REWARDS_API}/boosters/products/preview`], url => api.getFetcher(`${url}`))
  return {
    reviewPhoto: data,
    mutate,
    error
  }
}
