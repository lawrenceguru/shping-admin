export const UPDATE_SOURCES = 'description/UPDATE_SOURCES'
export const UPDATE_SOURCES_SUCCESS = 'description/UPDATE_SOURCES_SUCCESS'
export const UPDATE_SOURCES_FAIL = 'description/UPDATE_SOURCES_FAIL'

export const descriptionUpdateSources = payload => ({
  type: UPDATE_SOURCES,
  payload
})

export const descriptionUpdateSourcesSuccess = payload => ({
  type: UPDATE_SOURCES_SUCCESS,
  payload
})

export const descriptionUpdateSourcesFail = error => ({
  type: UPDATE_SOURCES_FAIL,
  payload: {
    error
  }
})
