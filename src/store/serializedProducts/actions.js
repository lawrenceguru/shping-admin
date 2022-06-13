export const POST_PRODUCTS = 'serializedProducts/POST_PRODUCTS'
export const POST_PRODUCTS_SUCCESS = 'serializedProducts/POST_PRODUCTS_SUCCESS'
export const POST_PRODUCTS_FAIL = 'serializedProducts/POST_PRODUCTS_FAIL'

export const SET_PRODUCTS_ORDER = 'serializedProducts/SET_PRODUCTS_ORDER'

export const serializedProductsGetProducts = payload => ({
  type: POST_PRODUCTS,
  payload
})

export const serializedProductsGetProductsSuccess = payload => ({
  type: POST_PRODUCTS_SUCCESS,
  payload
})

export const serializedProductsGetProductsFail = error => ({
  type: POST_PRODUCTS_FAIL,
  payload: {
    error
  }
})

export const serializedProductsSetProductsOrder = payload => ({
  type: SET_PRODUCTS_ORDER,
  payload
})
