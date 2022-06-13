import {
  GET_GPC_SEGMENTS,
  GET_GPC_SEGMENTS_SUCCESS,
  GET_GPC_SEGMENTS_FAIL,
  GET_GPC_FAMILIES,
  GET_GPC_FAMILIES_SUCCESS,
  GET_GPC_FAMILIES_FAIL,
  GET_GPC_CLASSES,
  GET_GPC_CLASSES_SUCCESS,
  GET_GPC_CLASSES_FAIL,
  GET_GPC_BRICKS,
  GET_GPC_BRICKS_SUCCESS,
  GET_GPC_BRICKS_FAIL,
  GET_GPC_ATTR_KEYS,
  GET_GPC_ATTR_KEYS_SUCCESS,
  GET_GPC_ATTR_KEYS_FAIL,
  GET_GPC_ATTR_VALUES,
  GET_GPC_ATTR_VALUES_SUCCESS,
  GET_GPC_ATTR_VALUES_FAIL,
  GET_GPC_ATTRS_VALUES
} from './actions'

const initialState = {
  segments: [],
  schema: null,
  families: [],
  classes: [],
  bricks: [],
  keys: [],
  values: { '': '' }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GPC_SEGMENTS:
      return {
        ...state,
        isLoadingGpcSegments: true
      }
    case GET_GPC_SEGMENTS_SUCCESS:
      return {
        ...state,
        segments: payload.segments,
        schema: payload.schema,
        isLoadingGpcSegments: false
      }
    case GET_GPC_SEGMENTS_FAIL:
      return {
        ...state,
        segments: [],
        isLoadingGpcSegments: false
      }

    case GET_GPC_FAMILIES:
      return {
        ...state,
        isLoadingGpcFamilies: true
      }
    case GET_GPC_FAMILIES_SUCCESS:
      return {
        ...state,
        families: payload.families,
        isLoadingGpcFamilies: false
      }
    case GET_GPC_FAMILIES_FAIL:
      return {
        ...state,
        families: [],
        isLoadingGpcFamilies: false
      }

    case GET_GPC_CLASSES:
      return {
        ...state,
        isLoadingGpcClasses: true
      }
    case GET_GPC_CLASSES_SUCCESS:
      return {
        ...state,
        classes: payload.classes,
        isLoadingGpcClasses: false
      }
    case GET_GPC_CLASSES_FAIL:
      return {
        ...state,
        classes: [],
        isLoadingGpcClasses: false
      }

    case GET_GPC_BRICKS:
      return {
        ...state,
        isLoadingGpcBricks: true
      }
    case GET_GPC_BRICKS_SUCCESS:
      return {
        ...state,
        bricks: payload.bricks,
        isLoadingGpcBricks: false
      }
    case GET_GPC_BRICKS_FAIL:
      return {
        ...state,
        bricks: [],
        isLoadingGpcBricks: false
      }

    case GET_GPC_ATTR_KEYS:
      return {
        ...state,
        isLoadingGpcAttrKeys: true
      }
    case GET_GPC_ATTR_KEYS_SUCCESS:
      return {
        ...state,
        keys: payload.attributes,
        isLoadingGpcAttrKeys: false
      }
    case GET_GPC_ATTR_KEYS_FAIL:
      return {
        ...state,
        keys: [],
        isLoadingGpcAttrKeys: false
      }

    case GET_GPC_ATTR_VALUES:
      return {
        ...state,
        isLoadingGpcValues: true
      }
    case GET_GPC_ATTR_VALUES_SUCCESS:
      return {
        ...state,
        values: payload.values,
        isLoadingGpcValues: false
      }
    case GET_GPC_ATTR_VALUES_FAIL:
      return {
        ...state,
        values: [],
        isLoadingGpcValues: false
      }
    case GET_GPC_ATTRS_VALUES:
      return {
        ...state,
        isLoadingGpcValues: true
      }
    default:
      return state
  }
}
