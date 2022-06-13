export const INVENTORY_POST = 'inventory/INVENTORY_POST'
export const INVENTORY_POST_SUCCESS = 'inventory/INVENTORY_POST_SUCCESS'
export const INVENTORY_POST_FAIL = 'inventory/INVENTORY_POST_FAIL'

export const INVENTORY_POST_EXPORT = 'inventory/INVENTORY_POST_EXPORT'
export const INVENTORY_POST_EXPORT_SUCCESS = 'inventory/INVENTORY_POST_EXPORT_SUCCESS'
export const INVENTORY_POST_EXPORT_FAIL = 'inventory/INVENTORY_POST_EXPORT_FAIL'

export const INVENTORY_CLEAR_EXPORT = 'inventory/INVENTORY_CLEAR_EXPORT'

export const inventoryGetItems = payload => ({
  type: INVENTORY_POST,
  payload
})

export const inventoryPostSuccess = payload => ({
  type: INVENTORY_POST_SUCCESS,
  payload
})

export const inventoryPostFail = error => ({
  type: INVENTORY_POST_FAIL,
  payload: {
    error
  }
})

export const inventoryGetItemsExport = payload => ({
  type: INVENTORY_POST_EXPORT,
  payload
})

export const inventoryPostSuccessExport = payload => ({
  type: INVENTORY_POST_EXPORT_SUCCESS,
  payload
})

export const inventoryPostFailExport = error => ({
  type: INVENTORY_POST_EXPORT_FAIL,
  payload: {
    error
  }
})

export const inventoryClearFullData = () => ({
  type: INVENTORY_CLEAR_EXPORT
})
