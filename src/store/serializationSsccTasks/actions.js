export const GET_SERIALIZATION_SSCC_OPTIONS = 'trackTrace/GET_SERIALIZATION_SSCC_OPTIONS'
export const POST_SERIALIZATION_SSCC_OPTIONS = 'trackTrace/POST_SERIALIZATION_SSCC_OPTIONS'
export const POST_SERIALIZATION_SSCC_OPTIONS_SUCCESS = 'trackTrace/POST_SERIALIZATION_SSCC_OPTIONS_SUCCESS'
export const POST_SERIALIZATION_SSCC_OPTIONS_FAIL = 'trackTrace/POST_SERIALIZATION_SSCC_OPTIONS_FAIL'

export const CLEAR_SERIALIZATION_SSCC_OPTIONS = 'trackTrace/CLEAR_SERIALIZATION_SSCC_OPTIONS'

export const serializationGetSSCCOptions = payload => ({
  type: GET_SERIALIZATION_SSCC_OPTIONS,
  payload
})

export const createSerializationGetSSCCOptions = () => ({
  type: POST_SERIALIZATION_SSCC_OPTIONS
})

export const serializationGetSSCCOptionsSuccess = payload => ({
  type: POST_SERIALIZATION_SSCC_OPTIONS_SUCCESS,
  payload
})

export const serializationGetSSCCOptionsFail = payload => ({
  type: POST_SERIALIZATION_SSCC_OPTIONS_FAIL,
  payload
})

export const clearSerializationGetSSCCOptions = () => ({
  type: CLEAR_SERIALIZATION_SSCC_OPTIONS
})
