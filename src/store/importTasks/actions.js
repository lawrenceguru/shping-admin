export const GET_IMPORT_PARTICIPANTS = 'importTasks/GET_IMPORT_PARTICIPANTS'
export const GET_IMPORT_PARTICIPANTS_SUCCESS = 'importTasks/GET_IMPORT_PARTICIPANTS_SUCCESS'
export const GET_IMPORT_PARTICIPANTS_FAIL = 'importTasks/GET_IMPORT_PARTICIPANTS_FAIL'

export const GET_IMPORT_PARTICIPANT_HISTORY = 'importTasks/GET_IMPORT_PARTICIPANT_HISTORY'
export const GET_IMPORT_PARTICIPANT_HISTORY_SUCCESS = 'importTasks/GET_IMPORT_PARTICIPANT_HISTORY_SUCCESS'
export const GET_IMPORT_PARTICIPANT_HISTORY_FAIL = 'importTasks/GET_IMPORT_PARTICIPANT_HISTORY_FAIL'

export const importTasksGetImportParticipants = payload => ({
  type: GET_IMPORT_PARTICIPANTS,
  payload
})

export const importTasksGetImportParticipantsSuccess = payload => ({
  type: GET_IMPORT_PARTICIPANTS_SUCCESS,
  payload
})

export const importTasksGetImportParticipantsFail = payload => ({
  type: GET_IMPORT_PARTICIPANTS_FAIL,
  payload
})

export const importTasksGetImportParticipantHistory = payload => ({
  type: GET_IMPORT_PARTICIPANT_HISTORY,
  payload
})

export const importTasksGetImportParticipantHistorySuccess = payload => ({
  type: GET_IMPORT_PARTICIPANT_HISTORY_SUCCESS,
  payload
})

export const importTasksGetImportParticipantHistoryFail = payload => ({
  type: GET_IMPORT_PARTICIPANT_HISTORY_FAIL,
  payload
})
