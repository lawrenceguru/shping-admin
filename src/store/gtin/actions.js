export const GET_GTIN = 'gtin/GET_GTIN'
export const GET_GTIN_START = 'gtin/GET_GTIN_START'
export const GET_GTIN_SUCCESS = 'gtin/GET_GTIN_SUCCESS'
export const GET_GTIN_FAIL = 'gtin/GET_GTIN_FAIL'
export const GET_GTIN_END = 'gtin/GET_GTIN_END'
export const DELETE_GTIN = 'gtin/DELETE_GTIN'
export const DELETE_GTIN_SUCCESS = 'gtin/DELETE_GTIN_SUCCESS'
export const DELETE_GTIN_FAIL = 'gtin/DELETE_GTIN_FAIL'
export const UPDATE_GTIN = 'gtin/UPDATE_GTIN'
export const UPDATE_GTIN_SUCCESS = 'gtin/UPDATE_GTIN_SUCCESS'
export const UPDATE_GTIN_FAIL = 'gtin/UPDATE_GTIN_FAIL'
export const UPDATE_GTIN_SOURCES_SUCCESS = 'gtin/UPDATE_GTIN_SOURCES_SUCCESS'
export const CLEAR_GTIN_INFO = 'gtin/CLEAR_GTIN_INFO'
export const START_UPDATE_GTIN = 'gtin/START_UPDATE_GTIN'
export const END_UPDATE_GTIN = 'gtin/END_UPDATE_GTIN'

export const getGtin = payload => ({
  type: GET_GTIN,
  payload
})

export const getGtinStart = payload => ({
  type: GET_GTIN_START,
  payload
})

export const getGtinSuccess = payload => ({
  type: GET_GTIN_SUCCESS,
  payload
})

export const getGtinFail = error => ({
  type: GET_GTIN_FAIL,
  payload: {
    error
  }
})

export const getGtinEnd = payload => ({
  type: GET_GTIN_END,
  payload
})

export const deleteGtin = payload => ({
  type: DELETE_GTIN,
  payload
})

export const deleteGtinSuccess = payload => ({
  type: DELETE_GTIN_SUCCESS,
  payload
})

export const deleteGtinFail = error => ({
  type: DELETE_GTIN_FAIL,
  payload: {
    error
  }
})

export const startUpdateGtin = () => ({
  type: START_UPDATE_GTIN
})

export const endUpdateGtin = () => ({
  type: END_UPDATE_GTIN
})

export const updateGtin = payload => ({
  type: UPDATE_GTIN,
  payload
})

export const updateGtinSuccess = payload => ({
  type: UPDATE_GTIN_SUCCESS,
  payload
})

export const updateGtinFail = error => ({
  type: UPDATE_GTIN_FAIL,
  payload: {
    error
  }
})

export const updateGtinSourcesSuccess = payload => ({
  type: UPDATE_GTIN_SOURCES_SUCCESS,
  payload
})

export const clearGtinInfo = payload => ({
  type: CLEAR_GTIN_INFO,
  payload
})
