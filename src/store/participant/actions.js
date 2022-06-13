export const GET_PARTICIPANT_PROFILE = 'participant/GET_PARTICIPANT_PROFILE'
export const GET_PARTICIPANT_PROFILE_SUCCESS = 'participant/GET_PARTICIPANT_PROFILE_SUCCESS'
export const GET_PARTICIPANT_PROFILE_FAIL = 'participant/GET_PARTICIPANT_PROFILE_FAIL'

export const GET_PARTICIPANT_DEPOSIT = 'participant/GET_PARTICIPANT_DEPOSIT'
export const GET_PARTICIPANT_DEPOSIT_SUCCESS = 'participant/GET_PARTICIPANT_DEPOSIT_SUCCESS'
export const GET_PARTICIPANT_DEPOSIT_FAIL = 'participant/GET_PARTICIPANT_DEPOSIT_FAIL'

export const participantGetParticipantProfile = payload => ({
  type: GET_PARTICIPANT_PROFILE,
  payload
})

export const participantGetParticipantProfileSuccess = payload => ({
  type: GET_PARTICIPANT_PROFILE_SUCCESS,
  payload
})

export const participantGetParticipantProfileFail = payload => ({
  type: GET_PARTICIPANT_PROFILE_FAIL,
  payload
})

export const participantGetParticipantDeposit = payload => ({
  type: GET_PARTICIPANT_DEPOSIT,
  payload
})

export const participantGetParticipantDepositSuccess = payload => ({
  type: GET_PARTICIPANT_DEPOSIT_SUCCESS,
  payload
})

export const participantGetParticipantDepositFail = payload => ({
  type: GET_PARTICIPANT_DEPOSIT_FAIL,
  payload
})
