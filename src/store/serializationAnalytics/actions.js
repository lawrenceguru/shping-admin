export const GET_PRODUCTS_STATISTIC = 'analytic/GET_PRODUCTS_STATISTIC'
export const GET_PRODUCTS_STATISTIC_SUCCESS = 'analytic/GET_PRODUCTS_STATISTIC_SUCCESS'
export const GET_PRODUCTS_STATISTIC_FAIL = 'analytic/GET_PRODUCTS_STATISTIC_FAIL'

export const GET_CREATED_PRODUCTS = 'analytic/GET_CREATED_PRODUCTS'
export const GET_CREATED_PRODUCTS_SUCCESS = 'analytic/GET_CREATED_PRODUCTS_SUCCESS'
export const GET_CREATED_PRODUCTS_FAIL = 'analytic/GET_CREATED_PRODUCTS_FAIL'

export const GET_INTO_CIRCULATION_PRODUCTS = 'analytic/GET_INTO_CIRCULATION_PRODUCTS'
export const GET_INTO_CIRCULATION_PRODUCTS_SUCCESS = 'analytic/GET_INTO_CIRCULATION_PRODUCTS_SUCCESS'
export const GET_INTO_CIRCULATION_PRODUCTS_FAIL = 'analytic/GET_INTO_CIRCULATION_PRODUCTS_FAIL'

export const GET_SHIPPED_PRODUCTS = 'analytic/GET_SHIPPED_PRODUCTS'
export const GET_SHIPPED_PRODUCTS_SUCCESS = 'analytic/GET_SHIPPED_PRODUCTS_SUCCESS'
export const GET_SHIPPED_PRODUCTS_FAIL = 'analytic/GET_SHIPPED_PRODUCTS_FAIL'

export const serializationGetProductsStatistic = payload => ({
  type: GET_PRODUCTS_STATISTIC,
  payload
})

export const serializationGetProductsStatisticSuccess = payload => ({
  type: GET_PRODUCTS_STATISTIC_SUCCESS,
  payload
})

export const serializationGetProductsStatisticFail = payload => ({
  type: GET_PRODUCTS_STATISTIC_FAIL,
  payload
})

export const serializationGetCreatedProducts = payload => ({
  type: GET_CREATED_PRODUCTS,
  payload
})

export const serializationGetCreatedProductsSuccess = payload => ({
  type: GET_CREATED_PRODUCTS_SUCCESS,
  payload
})
export const serializationGetCreatedProductsFail = payload => ({
  type: GET_CREATED_PRODUCTS_FAIL,
  payload
})

export const serializationGetIntoCirculationProducts = payload => ({
  type: GET_INTO_CIRCULATION_PRODUCTS,
  payload
})

export const serializationGetIntoCirculationProductsSuccess = payload => ({
  type: GET_INTO_CIRCULATION_PRODUCTS_SUCCESS,
  payload
})

export const serializationGetIntoCirculationProductsFail = payload => ({
  type: GET_INTO_CIRCULATION_PRODUCTS_FAIL,
  payload
})

export const serializationGetShippedProducts = payload => ({
  type: GET_SHIPPED_PRODUCTS,
  payload
})

export const serializationGetShippedProductsSuccess = payload => ({
  type: GET_SHIPPED_PRODUCTS_SUCCESS,
  payload
})

export const serializationGetShippedProductsFail = payload => ({
  type: GET_SHIPPED_PRODUCTS_FAIL,
  payload
})
