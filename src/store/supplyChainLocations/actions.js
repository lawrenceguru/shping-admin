export const GET_SUPPLY_PARTICIPANT_LOCATION = 'participant/GET_SUPPLY_PARTICIPANT_LOCATION'
export const GET_SUPPLY_PARTICIPANT_LOCATION_SUCCESS = 'participant/GET_SUPPLY_PARTICIPANT_LOCATION_SUCCESS'
export const GET_SUPPLY_PARTICIPANT_LOCATION_FAIL = 'participant/GET_SUPPLY_PARTICIPANT_LOCATION_FAIL'

export const DELETE_SUPPLY_PARTICIPANT_LOCATION = 'participant/DELETE_SUPPLY_PARTICIPANT_LOCATION'
export const DELETE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS = 'participant/DELETE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS'
export const DELETE_SUPPLY_PARTICIPANT_LOCATION_FAIL = 'participant/DELETE_SUPPLY_PARTICIPANT_LOCATION_FAIL'

export const CREATE_SUPPLY_PARTICIPANT_LOCATION = 'participant/CREATE_SUPPLY_PARTICIPANT_LOCATION'
export const CREATE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS = 'participant/CREATE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS'
export const CREATE_SUPPLY_PARTICIPANT_LOCATION_FAIL = 'participant/CREATE_SUPPLY_PARTICIPANT_LOCATION_FAIL'

export const SELECT_LOCATION = 'participant/SELECT_LOCATION'
export const CLEAR_SELECTED_LOCATION = 'participant/CLEAR_SELECTED_LOCATION'

export const UPDATE_SUPPLY_PARTICIPANT_LOCATION = 'participant/UPDATE_SUPPLY_PARTICIPANT_LOCATION'
export const UPDATE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS = 'participant/UPDATE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS'
export const UPDATE_SUPPLY_PARTICIPANT_LOCATION_FAIL = 'participant/CREATE_SUPPLY_PARTICIPANT_LOCATION_FAIL'

export const getParticipantLocation = payload => ({
  type: GET_SUPPLY_PARTICIPANT_LOCATION,
  payload
})

export const getParticipantLocationSuccess = payload => ({
  type: GET_SUPPLY_PARTICIPANT_LOCATION_SUCCESS,
  payload
})

export const getParticipantLocationFail = error => ({
  type: GET_SUPPLY_PARTICIPANT_LOCATION_FAIL,
  error
})

export const deleteParticipantLocation = payload => ({
  type: DELETE_SUPPLY_PARTICIPANT_LOCATION,
  payload
})

export const deleteParticipantLocationSuccess = () => ({
  type: DELETE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS
})

export const deleteParticipantLocationFail = error => ({
  type: DELETE_SUPPLY_PARTICIPANT_LOCATION_FAIL,
  error
})

export const createParticipantLocation = payload => ({
  type: CREATE_SUPPLY_PARTICIPANT_LOCATION,
  payload
})

export const createParticipantLocationSuccess = () => ({
  type: CREATE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS
})

export const createParticipantLocationFail = error => ({
  type: CREATE_SUPPLY_PARTICIPANT_LOCATION_FAIL,
  error
})

export const selectLocation = payload => ({
  type: SELECT_LOCATION,
  payload
})

export const clearSelectedLocation = payload => ({
  type: CLEAR_SELECTED_LOCATION,
  payload
})

export const updateParticipantLocation = payload => ({
  type: UPDATE_SUPPLY_PARTICIPANT_LOCATION,
  payload
})

export const updateParticipantLocationSuccess = () => ({
  type: UPDATE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS
})

export const updateParticipantLocationFail = error => ({
  type: UPDATE_SUPPLY_PARTICIPANT_LOCATION_FAIL,
  error
})
