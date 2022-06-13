import { BUDDIES_API } from 'constants/url'
import api from '../api'

const useCities = async id => {
  const data = await api.postFetcher(`${BUDDIES_API}/buddies`, { id, action: 'delete' })
  return {
    result: data?.status
  }
}

export default useCities
