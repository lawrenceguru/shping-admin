export const POST_SERIALIZATION_GTIN_SELECT = 'trackTrace/POST_SERIALIZATION_GTIN_SELECT'
export const POST_SERIALIZATION_GTIN_SELECT_SUCCESS = 'trackTrace/POST_SERIALIZATION_GTIN_SELECT_SUCCESS'
export const POST_SERIALIZATION_GTIN_SELECT_FAIL = 'trackTrace/POST_SERIALIZATION_GTIN_SELECT_FAIL'

export const POST_SERIALIZATION_GTIN_VALUES = 'trackTrace/POST_SERIALIZATION_GTIN_VALUES'
export const POST_SERIALIZATION_GTIN_VALUES_SUCCESS = 'trackTrace/POST_SERIALIZATION_GTIN_VALUES_SUCCESS'
export const POST_SERIALIZATION_GTIN_VALUES_FAIL = 'trackTrace/POST_SERIALIZATION_GTIN_VALUES_FAIL'

export const serializationGetGtinSelect = payload => ({
  type: POST_SERIALIZATION_GTIN_SELECT,
  payload
})

export const serializationGetGtinSelectSuccess = payload => ({
  type: POST_SERIALIZATION_GTIN_SELECT_SUCCESS,
  payload
})

export const serializationGetGtinSelectFail = error => ({
  type: POST_SERIALIZATION_GTIN_SELECT_FAIL,
  error
})

export const serializationGetGtinValues = payload => ({
  type: POST_SERIALIZATION_GTIN_VALUES,
  payload
})

export const serializationGetGtinValuesSuccess = payload => ({
  type: POST_SERIALIZATION_GTIN_VALUES_SUCCESS,
  payload
})

export const serializationGetGtinValuesFail = error => ({
  type: POST_SERIALIZATION_GTIN_VALUES_FAIL,
  error
})
