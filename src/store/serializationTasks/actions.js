export const GET_SERIALIZATION = 'serialization/GET'
export const GET_SERIALIZATION_FAIL = 'serialization/GET_FAIL'
export const GET_SERIALIZATION_SUCCESS = 'serialization/GET_SUCCESS'

export const GET_SERIALIZATION_LENGTH_SUCCESS = 'serialization/GET_LENGTH_SUCCESS'

export const SERIALIZE_GET_SSCC_TASKS_STATUS = 'trackTrace/GET_SSCC_TASKS_STATUS'
export const SERIALIZE_GET_SSCC_TASKS_STATUS_SUCCESS = 'trackTrace/GET_SSCC_TASKS_STATUS_SUCCESS'
export const SERIALIZE_GET_SSCC_TASKS_STATUS_FAIL = 'trackTrace/GET_SSCC_TASKS_STATUS_FAIL'

export const serializationGetItems = payload => ({
  type: GET_SERIALIZATION,
  payload
})

export const serializationGetItemsLengthSuccess = payload => ({
  type: GET_SERIALIZATION_LENGTH_SUCCESS,
  payload
})

export const serializationGetItemsSuccess = payload => ({
  type: GET_SERIALIZATION_SUCCESS,
  payload
})

export const serializationGetItemsFail = error => ({
  type: GET_SERIALIZATION_FAIL,
  error
})

export const serializeGetSSCCTasksStatus = () => ({
  type: SERIALIZE_GET_SSCC_TASKS_STATUS
})

export const serializeGetSSCCTasksStatusSuccess = payload => ({
  type: SERIALIZE_GET_SSCC_TASKS_STATUS_SUCCESS,
  payload
})

export const serializeGetSSCCTasksStatusFail = error => ({
  type: SERIALIZE_GET_SSCC_TASKS_STATUS_FAIL,
  error
})
