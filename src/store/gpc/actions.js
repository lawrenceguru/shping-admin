export const GET_GPC_SEGMENTS = 'gps/GET_GPC_SEGMENTS'
export const GET_GPC_SEGMENTS_SUCCESS = 'gps/GET_GPC_SEGMENTS_SUCCESS'
export const GET_GPC_SEGMENTS_FAIL = 'gps/GET_GPC_SEGMENTS_FAIL'

export const GET_GPC_FAMILIES = 'gps/GET_GPC_FAMILIES'
export const GET_GPC_FAMILIES_SUCCESS = 'gps/GET_GPC_FAMILIES_SUCCESS'
export const GET_GPC_FAMILIES_FAIL = 'gps/GET_GPC_FAMILIES_FAIL'

export const GET_GPC_CLASSES = 'gps/GET_GPC_CLASSES'
export const GET_GPC_CLASSES_SUCCESS = 'gps/GET_GPC_CLASSES_SUCCESS'
export const GET_GPC_CLASSES_FAIL = 'gps/GET_GPC_CLASSES_FAIL'

export const GET_GPC_BRICKS = 'gps/GET_GPC_BRICKS'
export const GET_GPC_BRICKS_SUCCESS = 'gps/GET_GPC_BRICKS_SUCCESS'
export const GET_GPC_BRICKS_FAIL = 'gps/GET_GPC_BRICKS_FAIL'

export const GET_GPC_ATTR_KEYS = 'gps/GET_GPC_ATTR_KEYS'
export const GET_GPC_ATTR_KEYS_SUCCESS = 'gps/GET_GPC_ATTR_KEYS_SUCCESS'
export const GET_GPC_ATTR_KEYS_FAIL = 'gps/GET_GPC_ATTR_KEYS_FAIL'

export const GET_GPC_ATTR_VALUES = 'gps/GET_GPC_ATTR_VALUES'
export const GET_GPC_ATTR_VALUES_SUCCESS = 'gps/GET_GPC_ATTR_VALUES_SUCCESS'
export const GET_GPC_ATTR_VALUES_FAIL = 'gps/GET_GPC_ATTR_VALUES_FAIL'

export const GET_GPC_ATTRS_VALUES = 'gps/GET_GPC_ATTRS_VALUES'
export const GET_GPC_ATTRS_VALUES_SUCCESS = 'gps/GET_GPC_ATTRS_VALUES_SUCCESS'
export const GET_GPC_ATTRS_VALUES_FAIL = 'gps/GET_GPC_ATTRS_VALUES_FAIL'

export const getGpsSegments = payload => ({
  type: GET_GPC_SEGMENTS,
  payload
})

export const getGpsSegmentsSuccess = payload => ({
  type: GET_GPC_SEGMENTS_SUCCESS,
  payload
})

export const getGpsSegmentsFail = error => ({
  type: GET_GPC_SEGMENTS_FAIL,
  payload: {
    error
  }
})

export const getGpsFamilies = payload => ({
  type: GET_GPC_FAMILIES,
  payload
})

export const getGpsFamiliesSuccess = payload => ({
  type: GET_GPC_FAMILIES_SUCCESS,
  payload
})

export const getGpsFamiliesFail = error => ({
  type: GET_GPC_FAMILIES_FAIL,
  payload: {
    error
  }
})

export const getGpsClasses = payload => ({
  type: GET_GPC_CLASSES,
  payload
})

export const getGpsClassesSuccess = payload => ({
  type: GET_GPC_CLASSES_SUCCESS,
  payload
})

export const getGpsClassesFail = error => ({
  type: GET_GPC_CLASSES_FAIL,
  payload: {
    error
  }
})

export const getGpsBricks = payload => ({
  type: GET_GPC_BRICKS,
  payload
})

export const getGpsBricksSuccess = payload => ({
  type: GET_GPC_BRICKS_SUCCESS,
  payload
})

export const getGpsBricksFail = error => ({
  type: GET_GPC_BRICKS_FAIL,
  payload: {
    error
  }
})

export const getGpsAttrKeys = payload => ({
  type: GET_GPC_ATTR_KEYS,
  payload
})

export const getGpsAttrKeysSuccess = payload => ({
  type: GET_GPC_ATTR_KEYS_SUCCESS,
  payload
})

export const getGpsAttrKeysFail = error => ({
  type: GET_GPC_ATTR_KEYS_FAIL,
  payload: {
    error
  }
})

export const getGpsAttrValues = payload => ({
  type: GET_GPC_ATTR_VALUES,
  payload
})

export const getGpsAttrValuesSuccess = payload => ({
  type: GET_GPC_ATTR_VALUES_SUCCESS,
  payload
})

export const getGpsAttrValuesFail = error => ({
  type: GET_GPC_ATTR_VALUES_FAIL,
  payload: {
    error
  }
})

export const getGpsAttrsValues = payload => ({
  type: GET_GPC_ATTRS_VALUES,
  payload
})
