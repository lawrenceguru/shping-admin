export const GET_INDEX_INFO = 'indexFieldsSerialization/GET_INDEX_INFO'
export const GET_INDEX_INFO_SUCCESS = 'indexFieldsSerialization/GET_INDEX_INFO_SUCCESS'
export const GET_INDEX_INFO_FAIL = 'indexFieldsSerialization/GET_INDEX_INFO_FAIL'

export const POST_INDEX_INFO = 'indexFieldsSerialization/POST_INDEX_INFO'
export const POST_INDEX_INFO_SUCCESS = 'indexFieldsSerialization/POST_INDEX_INFO_SUCCESS'
export const POST_INDEX_INFO_FAIL = 'indexFieldsSerialization/POST_INDEX_INFO_FAIL'

export const GET_BRANDS = 'indexFieldsSerialization/GET_BRANDS'
export const GET_BRANDS_SUCCESS = 'indexFieldsSerialization/GET_BRANDS_SUCCESS'
export const GET_BRANDS_FAIL = 'indexFieldsSerialization/GET_BRANDS_FAIL'

export const CLEAR_TABLE_NAME = 'indexFieldsSerialization/CLEAR_TABLE_NAME'

export const indexFieldsSerializationGetIndexInfo = () => ({
  type: GET_INDEX_INFO
})

export const indexFieldsSerializationGetIndexInfoSuccess = payload => ({
  type: GET_INDEX_INFO_SUCCESS,
  payload
})

export const indexFieldsSerializationGetIndexInfoFail = error => ({
  type: GET_INDEX_INFO_FAIL,
  payload: {
    error
  }
})

export const indexFieldsSerializationPostIndexInfo = payload => ({
  type: POST_INDEX_INFO,
  payload
})

export const indexFieldsSerializationPostIndexInfoSuccess = payload => ({
  type: POST_INDEX_INFO_SUCCESS,
  payload
})

export const indexFieldsSerializationPostIndexInfoFail = error => ({
  type: POST_INDEX_INFO_FAIL,
  payload: {
    error
  }
})

export const indexFieldsSerializationClearTableName = payload => ({
  type: CLEAR_TABLE_NAME,
  payload
})
