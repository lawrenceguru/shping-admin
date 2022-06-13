import { UPDATE_SOURCES, UPDATE_SOURCES_SUCCESS, UPDATE_SOURCES_FAIL } from './actions'

export default (state = {}, { type }) => {
  switch (type) {
    case UPDATE_SOURCES:
      return {
        ...state,
        isUpdatingSources: true
      }
    case UPDATE_SOURCES_SUCCESS:
      return {
        ...state,
        isUpdatingSources: false
      }
    case UPDATE_SOURCES_FAIL:
      return {
        ...state,
        isUpdatingSources: false
      }
    default:
      return state
  }
}
