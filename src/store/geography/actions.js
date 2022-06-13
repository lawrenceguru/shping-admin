export const GET_COORDINATES = 'analytics/POST_COORDINATES'
export const GET_COORDINATES_SUCCESS = 'analytics/POST_COORDINATES_SUCCESS'
export const GET_COORDINATES_FAIL = 'analytics/POST_COORDINATES_FAIL'
export const GET_COUNTRIES_TOTAL = 'analytics/POST_COUNTRIES_TOTAL'
export const GET_COUNTRIES_TOTAL_SUCCESS = 'analytics/POST_COUNTRIES_TOTAL_SUCCESS'
export const GET_COUNTRIES_TOTAL_FAIL = 'analytics/POST_COUNTRIES_TOTAL_FAIL'
export const GET_STATES = 'analytics/POST_STATES'
export const GET_STATES_SUCCESS = 'analytics/POST_STATES_SUCCESS'
export const GET_STATES_FAIL = 'analytics/POST_STATES_FAIL'

export const analyticsGetCoordinates = () => ({
  type: GET_COORDINATES
})

export const analyticsGetCoordinatesSuccess = payload => ({
  type: GET_COORDINATES_SUCCESS,
  payload
})

export const analyticsGetCoordinatesFail = error => ({
  type: GET_COORDINATES_FAIL,
  payload: {
    error
  }
})

export const analyticsGetCountriesTotal = () => ({
  type: GET_COUNTRIES_TOTAL
})

export const analyticsGetCountriesTotalSuccess = payload => ({
  type: GET_COUNTRIES_TOTAL_SUCCESS,
  payload
})

export const analyticsGetCountriesTotalFail = error => ({
  type: GET_COUNTRIES_TOTAL_FAIL,
  payload: {
    error
  }
})
export const analyticsGetStates = () => ({
  type: GET_STATES
})

export const analyticsGetStatesSuccess = payload => ({
  type: GET_STATES_SUCCESS,
  payload
})

export const analyticsGetStatesFail = error => ({
  type: GET_STATES_FAIL,
  payload: {
    error
  }
})
