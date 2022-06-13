import { BUDDIES_API } from 'constants/url'
import api from '../api'

const useCities = async (status, id, chunkId) => {
  const data = await api.postFetcher(`${BUDDIES_API}/buddies/status`, { status, id, chunk_id: chunkId })
  return {
    result: data?.status
  }
}

export default useCities
