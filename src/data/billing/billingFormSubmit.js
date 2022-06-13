import { toast } from 'react-toastify'
import { IDENTITY_API } from 'constants/url'
import api from '../api'

const buillingFormSubmit = async val => {
  const data = await api.postFetcher(`${IDENTITY_API}/account/participant`, val).catch(() => {
    toast.error('The company prefix has been already registered by another participant.')
  })
  return {
    result: data?.billing?.trial
  }
}

export default buillingFormSubmit
