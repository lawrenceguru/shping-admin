import {
  GET_IMAGE_LABELS,
  GET_IMAGE_LABELS_SUCCESS,
  GET_IMAGE_FAILED,
  GET_IMAGE_OBJECTS_SUCCESS,
  PUT_IMAGE_LABELS,
  PUT_UPDATED_IMAGE_LABELS,
  DELETE_IMAGE_LABELS,
  POST_IMAGE_LABELS,
  POST_IMAGE_LABELS_SUCCESS
} from './actions'

import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_IMAGE_LABELS_SUCCESS:
      return {
        ...state,
        list: payload
      }
    case GET_IMAGE_LABELS:
      return {
        ...state,
        details: initialState.details
      }
    case GET_IMAGE_FAILED:
      return {
        ...state
      }
    case GET_IMAGE_OBJECTS_SUCCESS:
      return {
        ...state,
        details: {
          ...(Object.keys(payload).length ? payload : { objects: [] })
        }
      }
    case PUT_IMAGE_LABELS:
      // eslint-disable-next-line no-case-declarations
      const newSetOfObjects = state.details.objects
      // eslint-disable-next-line no-case-declarations
      newSetOfObjects.push({
        difficult: 0,
        truncated: false,
        bndbox: payload.bndbox,
        name: payload.value.toString().indexOf('urn:epc:id:gdti:') === 0 ? payload.value : payload.label,
        title: payload && payload.label
      })

      return {
        ...state,
        details: {
          ...state.details,
          objects: newSetOfObjects
        }
      }
    case PUT_UPDATED_IMAGE_LABELS:
      return {
        ...state,
        details: payload
      }
    case DELETE_IMAGE_LABELS:
      return {
        ...state,
        details: {
          ...state.details,
          objects: state.details.objects && state.details.objects.filter((item, i) => !payload.includes(i))
        }
      }
    case POST_IMAGE_LABELS:
      return {
        ...state,
        submitLoader: true
      }
    case POST_IMAGE_LABELS_SUCCESS:
      return {
        ...state,
        submitLoader: false
      }
    default:
      return state
  }
}
