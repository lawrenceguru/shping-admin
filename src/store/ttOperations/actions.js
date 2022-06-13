export const GET_OPERATIONS = 'ttOperations/GET_OPERATIONS'
export const GET_OPERATIONS_SUCCESS = 'ttOperations/GET_OPERATIONS_SUCCESS'
export const GET_OPERATIONS_FAIL = 'ttOperations/GET_OPERATIONS_FAIL'

export const operationsGetItems = payload => ({
  type: GET_OPERATIONS,
  payload
})

export const operationsGetItemsSuccess = payload => ({
  type: GET_OPERATIONS_SUCCESS,
  payload
})

export const operationsGetItemsFail = payload => ({
  type: GET_OPERATIONS_FAIL,
  payload
})
