export const GET_INDEX_INFO = 'indexFieldsProducts/GET_INDEX_INFO'
export const GET_INDEX_INFO_SUCCESS = 'indexFieldsProducts/GET_INDEX_INFO_SUCCESS'
export const GET_INDEX_INFO_FAIL = 'indexFieldsProducts/GET_INDEX_INFO_FAIL'

export const POST_INDEX_INFO = 'indexFieldsProducts/POST_INDEX_INFO'
export const POST_INDEX_INFO_SUCCESS = 'indexFieldsProducts/POST_INDEX_INFO_SUCCESS'
export const POST_INDEX_INFO_FAIL = 'indexFieldsProducts/POST_INDEX_INFO_FAIL'

export const GET_BRANDS = 'indexFieldsProducts/GET_BRANDS'
export const GET_BRANDS_SUCCESS = 'indexFieldsProducts/GET_BRANDS_SUCCESS'
export const GET_BRANDS_FAIL = 'indexFieldsProducts/GET_BRANDS_FAIL'

export const indexFieldsProductsGetIndexInfo = () => ({
  type: GET_INDEX_INFO
})

export const indexFieldsProductsGetIndexInfoSuccess = payload => ({
  type: GET_INDEX_INFO_SUCCESS,
  payload
})

export const indexFieldsProductsGetIndexInfoFail = error => ({
  type: GET_INDEX_INFO_FAIL,
  payload: {
    error
  }
})

export const indexFieldsProductsPostIndexInfo = payload => ({
  type: POST_INDEX_INFO,
  payload
})

export const indexFieldsProductsPostIndexInfoSuccess = payload => ({
  type: POST_INDEX_INFO_SUCCESS,
  payload
})

export const indexFieldsProductsPostIndexInfoFail = error => ({
  type: POST_INDEX_INFO_FAIL,
  payload: {
    error
  }
})

export const indexFieldsProductsGetBrands = payload => ({
  type: GET_BRANDS,
  payload
})

export const indexFieldsProductsGetBrandsSuccess = payload => ({
  type: GET_BRANDS_SUCCESS,
  payload
})

export const indexFieldsProductsGetBrandsFail = error => ({
  type: GET_BRANDS_FAIL,
  payload: {
    error
  }
})
