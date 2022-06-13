import { initialState } from './selectors'
import {
  GET_SERIALIZATION_SSCC_OPTIONS,
  POST_SERIALIZATION_SSCC_OPTIONS_SUCCESS,
  CLEAR_SERIALIZATION_SSCC_OPTIONS
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SERIALIZATION_SSCC_OPTIONS:
      return {
        ...state,
        company_prefix: payload.validInputsValue.company_prefix || '',
        sequence: Array.isArray(payload.validInputsValue.sequence) ? '' : payload.validInputsValue.sequence || '',
        serial_number: payload.validInputsValue.serial_number || '',
        count: payload.validInputsValue.count || ''
      }
    case POST_SERIALIZATION_SSCC_OPTIONS_SUCCESS:
      return {
        ...state,
        id: payload
      }
    case CLEAR_SERIALIZATION_SSCC_OPTIONS:
      return {
        ...initialState
      }
    default:
      return state
  }
}
