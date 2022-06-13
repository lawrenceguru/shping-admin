import { initialState } from './selectors'
import { GET_DATA_SERIALIZATION_STEP } from './actions'

export default (state = initialState, { type }) => {
  switch (type) {
    case GET_DATA_SERIALIZATION_STEP:
      return {
        ...state
      }
    default:
      return state
  }
}
