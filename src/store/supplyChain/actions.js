export const GET_SUPPLY_PARTICIPANTS = 'participant/GET_SUPPLY_PARTICIPANTS'
export const GET_SUPPLY_PARTICIPANTS_SUCCESS = 'participant/GET_SUPPLY_PARTICIPANTS_SUCCESS'
export const GET_SUPPLY_PARTICIPANTS_FAIL = 'participant/GET_SUPPLY_PARTICIPANTS_FAIL'

export const POST_SUPPLY_PARTICIPANTS = 'participant/POST_SUPPLY_PARTICIPANTS'
export const POST_SUPPLY_PARTICIPANTS_SUCCESS = 'participant/POST_SUPPLY_PARTICIPANTS_SUCCESS'
export const POST_SUPPLY_PARTICIPANTS_FAIL = 'participant/POST_SUPPLY_PARTICIPANTS_FAIL'

export const DELETE_SUPPLY_PARTICIPANT = 'participant/DELETE_SUPPLY_PARTICIPANT'
export const DELETE_SUPPLY_PARTICIPANT_SUCCESS = 'participant/DELETE_SUPPLY_PARTICIPANT_SUCCESS'
export const DELETE_SUPPLY_PARTICIPANT_FAIL = 'participant/DELETE_SUPPLY_PARTICIPANT_FAIL'

export const EDIT_PARTICIPANT = 'participant/EDIT_PARTICIPANT'
export const SELECT_PARTICIPANT = 'participant/SELECT_PARTICIPANT'

export const participantGetSupplyParticipants = payload => ({
  type: GET_SUPPLY_PARTICIPANTS,
  payload
})

export const participantGetSupplyParticipantsSuccess = payload => ({
  type: GET_SUPPLY_PARTICIPANTS_SUCCESS,
  payload
})

export const participantGetSupplyParticipantsFail = payload => ({
  type: GET_SUPPLY_PARTICIPANTS_FAIL,
  payload
})

export const createOrUpdateParticipant = payload => ({
  type: POST_SUPPLY_PARTICIPANTS,
  payload
})

export const createOrUpdateParticipantSuccess = payload => ({
  type: POST_SUPPLY_PARTICIPANTS_SUCCESS,
  payload
})

export const createOrUpdateParticipantFail = error => ({
  type: POST_SUPPLY_PARTICIPANTS_FAIL,
  error
})

export const deleteParticipant = payload => ({
  type: DELETE_SUPPLY_PARTICIPANT,
  payload
})

export const deleteParticipantSuccess = payload => ({
  type: DELETE_SUPPLY_PARTICIPANT_SUCCESS,
  payload
})

export const deleteParticipantFail = error => ({
  type: DELETE_SUPPLY_PARTICIPANT_FAIL,
  error
})

export const editParticipant = payload => ({
  type: EDIT_PARTICIPANT,
  payload
})

export const selectParticipant = payload => ({
  type: SELECT_PARTICIPANT,
  payload
})
