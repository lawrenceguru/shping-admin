export const GET_GDTI_CERTIFICATES = 'gtin/GET_GDTI_CERTIFICATES'
export const GET_GDTI_CERTIFICATES_SUCCESS = 'gtin/GET_GDTI_CERTIFICATES_SUCCESS'
export const GET_GDTI_CERTIFICATES_FAIL = 'gtin/GET_GDTI_CERTIFICATES_FAIL'
export const CLEAR_GDTI_INFO = 'gtin/CLEAR_GDTI_INFO'

export const GET_GDTI_NUTRITIONS = 'gtin/GET_GDTI_NUTRITIONS'
export const GET_GDTI_NUTRITIONS_SUCCESS = 'gtin/GET_GDTI_NUTRITIONS_SUCCESS'
export const GET_GDTI_NUTRITIONS_FAIL = 'gtin/GET_GDTI_NUTRITIONS_FAIL'

export const DELETE_GDTI = 'gdti/DELETE_GDTI'
export const DELETE_GDTI_SUCCESS = 'gdti/DELETE_GDTI_SUCCESS'
export const DELETE_GDTI_FAIL = 'gdti/DELETE_GDTI_FAIL'

export const POST_GDTI = 'gdti/POST_GDTI'
export const POST_GDTI_SUCCESS = 'gdti/POST_GDTI_SUCCESS'
export const POST_GDTI_FAIL = 'gdti/POST_GDTI_FAIL'

export const GET_GDTI = 'gdti/GET_GDTI'
export const GET_GDTI_SUCCESS = 'gdti/GET_GDTI_SUCCESS'
export const GET_GDTI_FAIL = 'gdti/GET_GDTI_FAIL'

export const UPDATE_GDTI = 'gdti/UPDATE_GDTI'
export const UPDATE_GDTI_SUCCESS = 'gdti/UPDATE_GDTI_SUCCESS'
export const UPDATE_GDTI_FAIL = 'gdti/UPDATE_GDTI_FAIL'

export const GET_GDTI_ATTACHED_GTIN = 'gdti/GET_GDTI_ATTACHED_GTIN'
export const GET_GDTI_ATTACHED_GTIN_SUCCESS = 'gdti/GET_GDTI_ATTACHED_GTIN_SUCCESS'
export const GET_GDTI_ATTACHED_GTIN_FAIL = 'gdti/GET_GDTI_ATTACHED_GTIN_FAIL'

export const POST_ATTACHED_GDTI = 'gdti/POST_ATTACHED_GDTI'
export const POST_ATTACHED_GDTI_SUCCESS = 'gdti/POST_ATTACHED_GDTI_SUCCESS'
export const POST_ATTACHED_GDTI_FAIL = 'gdti/POST_ATTACHED_GDTI_FAIL'

export const POST_DETACHED_GDTI = 'gdti/POST_DETACHED_GDTI'
export const POST_DETACHED_GDTI_SUCCESS = 'gdti/POST_DETACHED_GDTI_SUCCESS'
export const POST_DETACHED_GDTI_FAIL = 'gdti/POST_DETACHED_GDTI_FAIL'

export const GDTI_ATTACH_PRODUCTS = 'gdti/GDTI_ATTACH_PRODUCTS'
export const GDTI_ATTACH_PRODUCTS_SUCCESS = 'gdti/GDTI_ATTACH_PRODUCTS_SUCCESS'
export const GDTI_ATTACH_PRODUCTS_FAIL = 'gdti/GDTI_ATTACH_PRODUCTS_FAIL'

export const GDTI_GLOBAL_ATTACH_PRODUCTS = 'gdti/GDTI_GLOBAL_ATTACH_PRODUCTS'
export const GDTI_GLOBAL_ATTACH_PRODUCTS_SUCCESS = 'gdti/GDTI_GLOBAL_ATTACH_PRODUCTS_SUCCESS'
export const GDTI_GLOBAL_ATTACH_PRODUCTS_FAIL = 'gdti/GDTI_GLOBAL_ATTACH_PRODUCTS_FAIL'

export const getGdtiCertificates = payload => ({
  type: GET_GDTI_CERTIFICATES,
  payload
})

export const getGdtiCertificatesSuccess = payload => ({
  type: GET_GDTI_CERTIFICATES_SUCCESS,
  payload
})

export const getGdtiCertificatesFail = error => ({
  type: GET_GDTI_CERTIFICATES_FAIL,
  payload: {
    error
  }
})

export const clearGdtiInfo = error => ({
  type: CLEAR_GDTI_INFO,
  payload: {
    error
  }
})

export const getGdtiNutritions = payload => ({
  type: GET_GDTI_NUTRITIONS,
  payload
})

export const getGdtiNutritionsSuccess = payload => ({
  type: GET_GDTI_NUTRITIONS_SUCCESS,
  payload
})

export const getGdtiNutritionsFail = error => ({
  type: GET_GDTI_NUTRITIONS_FAIL,
  payload: {
    error
  }
})

export const deleteGdti = payload => ({
  type: DELETE_GDTI,
  payload
})

export const deleteGdtiSuccess = payload => ({
  type: DELETE_GDTI_SUCCESS,
  payload
})

export const deleteGdtiFail = payload => ({
  type: DELETE_GDTI_FAIL,
  payload
})

export const postGdti = payload => ({
  type: POST_GDTI,
  payload
})

export const postGdtiSuccess = payload => ({
  type: POST_GDTI_SUCCESS,
  payload
})

export const postGdtiFail = payload => ({
  type: POST_GDTI_FAIL,
  payload
})

export const getGdti = payload => ({
  type: GET_GDTI,
  payload
})

export const getGdtiSuccess = payload => ({
  type: GET_GDTI_SUCCESS,
  payload
})

export const getGdtiFail = payload => ({
  type: GET_GDTI_FAIL,
  payload
})

export const updateGdti = payload => ({
  type: UPDATE_GDTI,
  payload
})

export const updateGdtiSuccess = payload => ({
  type: UPDATE_GDTI_SUCCESS,
  payload
})

export const updateGdtiFail = payload => ({
  type: UPDATE_GDTI_FAIL,
  payload
})

export const getGdtiAttachedGtin = payload => ({
  type: GET_GDTI_ATTACHED_GTIN,
  payload
})

export const getGdtiAttachedGtinSuccess = payload => ({
  type: GET_GDTI_ATTACHED_GTIN_SUCCESS,
  payload
})

export const getGdtiAttachedGtinFail = payload => ({
  type: GET_GDTI_ATTACHED_GTIN_FAIL,
  payload
})

export const postAttacedGdti = payload => ({
  type: POST_ATTACHED_GDTI,
  payload
})

export const postAttacedGdtiSuccess = payload => ({
  type: POST_ATTACHED_GDTI_SUCCESS,
  payload
})

export const postAttacedGdtiFail = payload => ({
  type: POST_ATTACHED_GDTI_FAIL,
  payload
})

export const postDetachedGdti = payload => ({
  type: POST_DETACHED_GDTI,
  payload
})

export const postDetachedGdtiSuccess = payload => ({
  type: POST_DETACHED_GDTI_SUCCESS,
  payload
})

export const postDetachedGdtiFail = payload => ({
  type: POST_DETACHED_GDTI_FAIL,
  payload
})

export const gdtiAttachProducts = payload => ({
  type: GDTI_ATTACH_PRODUCTS,
  payload
})

export const gdtiAttachProductsSuccess = payload => ({
  type: GDTI_ATTACH_PRODUCTS_SUCCESS,
  payload
})

export const gdtiAttachProductsFail = payload => ({
  type: GDTI_ATTACH_PRODUCTS_FAIL,
  payload
})

export const gdtiGlobalAttachProducts = payload => ({
  type: GDTI_GLOBAL_ATTACH_PRODUCTS,
  payload
})

export const gdtiGlobalAttachProductsSuccess = payload => ({
  type: GDTI_GLOBAL_ATTACH_PRODUCTS_SUCCESS,
  payload
})

export const gdtiGlobalAttachProductsFail = payload => ({
  type: GDTI_GLOBAL_ATTACH_PRODUCTS_FAIL,
  payload
})
