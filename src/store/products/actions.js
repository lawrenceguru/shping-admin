export const GET_PRODUCTS_LIST = 'products/POST_PRODUCTS_LIST'
export const GET_PRODUCTS_LIST_SUCCESS = 'products/POST_PRODUCTS_LIST_SUCCESS'
export const GET_PRODUCTS_LIST_FAIL = 'products/POST_PRODUCTS_LIST_FAIL'

export const GET_PRODUCTS_GDTI = 'products/POST_PRODUCTS_GDTI'
export const GET_PRODUCTS_GDTI_SUCCESS = 'products/POST_PRODUCTS_GDTI_SUCCESS'
export const GET_PRODUCTS_GDTI_FAIL = 'products/POST_PRODUCTS_GDTI_FAIL'

export const CLEAR_PRODUCTS_GDTI = 'products/CLEAR_PRODUCTS_GDTI'
export const CLEAR_PRODUCT_LIST = 'products/CLEAR_PRODUCT_LIST'

export const GET_PRODUCT_COMPLETE_LIKE = 'products/GET_PRODUCT_COMPLETE_LIKE'
export const GET_PRODUCT_COMPLETE_LIKE_SUCCESS = 'products/GET_PRODUCT_COMPLETE_LIKE_SUCCESS'
export const GET_PRODUCT_COMPLETE_LIKE_FAIL = 'products/GET_PRODUCT_COMPLETE_LIKE_FAIL'

export const GET_GDTI_FOR_REWARDS_COMPLETE_LIKE = 'products/GET_GDTI_FOR_REWARDS_COMPLETE_LIKE'
export const GET_GDTI_FOR_REWARDS_COMPLETE_LIKE_SUCCESS = 'products/GET_GDTI_FOR_REWARDS_COMPLETE_LIKE_SUCCESS'
export const GET_GDTI_FOR_REWARDS_COMPLETE_LIKE_FAIL = 'products/GET_GDTI_FOR_REWARDS_COMPLETE_LIKE_FAIL'

export const GET_PRODUCTS_INFO = 'products/GET_PRODUCTS_INFO'
export const GET_PRODUCTS_INFO_SUCCESS = 'products/GET_PRODUCTS_INFO_SUCCESS'
export const GET_PRODUCTS_INFO_FAIL = 'products/GET_PRODUCTS_INFO_FAIL'

export const GET_GDTI_COMPLETE_LIKE = 'products/GET_GDTI_COMPLETE_LIKE'
export const GET_GDTI_COMPLETE_LIKE_SUCCESS = 'products/GET_GDTI_COMPLETE_LIKE_SUCCESS'
export const GET_GDTI_COMPLETE_LIKE_FAIL = 'products/GET_GDTI_COMPLETE_LIKE_FAIL'

export const GET_GDTI_INFO = 'products/GET_GDTI_INFO'
export const GET_GDTI_INFO_SUCCESS = 'products/GET_GDTI_INFO_SUCCESS'
export const GET_GDTI_INFO_FAIL = 'products/GET_GDTI_INFO_FAIL'

export const getProductsList = payload => ({
  type: GET_PRODUCTS_LIST,
  payload
})

export const getProductsListSuccess = payload => ({
  type: GET_PRODUCTS_LIST_SUCCESS,
  payload
})

export const clearProductsList = () => ({
  type: CLEAR_PRODUCT_LIST
})

export const getProductsListFail = error => ({
  type: GET_PRODUCTS_LIST_FAIL,
  payload: {
    error
  }
})

export const getProductsGdti = payload => ({
  type: GET_PRODUCTS_GDTI,
  payload
})

export const getProductsGdtiSuccess = payload => ({
  type: GET_PRODUCTS_GDTI_SUCCESS,
  payload
})

export const getProductsGdtiFail = error => ({
  type: GET_PRODUCTS_GDTI_FAIL,
  payload: {
    error
  }
})

export const getProductCompleteLike = payload => ({
  type: GET_PRODUCT_COMPLETE_LIKE,
  payload
})

export const getProductCompleteLikeSuccess = payload => ({
  type: GET_PRODUCT_COMPLETE_LIKE_SUCCESS,
  payload
})

export const getProductCompleteLikeFail = payload => ({
  type: GET_PRODUCT_COMPLETE_LIKE_FAIL,
  payload
})

export const clearProductsGdti = payload => ({
  type: CLEAR_PRODUCTS_GDTI,
  payload
})

export const getProductsInfo = payload => ({
  type: GET_PRODUCTS_INFO,
  payload
})

export const getProductsInfoSuccess = payload => ({
  type: GET_PRODUCTS_INFO_SUCCESS,
  payload
})

export const getProductsInfoFail = payload => ({
  type: GET_PRODUCTS_INFO_FAIL,
  payload
})

export const getGdtiCompleteLike = payload => ({
  type: GET_GDTI_COMPLETE_LIKE,
  payload
})

export const getGdtiCompleteLikeSuccess = payload => ({
  type: GET_GDTI_COMPLETE_LIKE_SUCCESS,
  payload
})

export const getGdtiCompleteLikeFail = payload => ({
  type: GET_GDTI_COMPLETE_LIKE_FAIL,
  payload
})

export const getGdtiInfo = payload => ({
  type: GET_GDTI_INFO,
  payload
})

export const getGdtiInfoSuccess = payload => ({
  type: GET_GDTI_INFO_SUCCESS,
  payload
})

export const getGdtiInfoFail = payload => ({
  type: GET_GDTI_INFO_FAIL,
  payload
})

export const getGdtiForRewardsCompleteLike = payload => ({
  type: GET_GDTI_FOR_REWARDS_COMPLETE_LIKE,
  payload
})

export const getGdtiForRewardsCompleteLikeSuccess = payload => ({
  type: GET_GDTI_FOR_REWARDS_COMPLETE_LIKE_SUCCESS,
  payload
})

export const getGdtiForRewardsCompleteLikeFail = payload => ({
  type: GET_GDTI_FOR_REWARDS_COMPLETE_LIKE_FAIL,
  payload
})
