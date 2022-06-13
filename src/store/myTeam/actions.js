export const GET_MY_TEAM = 'myTeam/GET_MY_TEAM'
export const GET_MY_TEAM_SUCCESS = 'myTeam/GET_MY_TEAM_SUCCESS'
export const GET_MY_TEAM_FAIL = 'myTeam/GET_MY_TEAM_FAIL'

export const POST_NOTIFICATION_ON = 'myTeam/POST_NOTIFICATION_ON'
export const POST_NOTIFICATION_ON_SUCCESS = 'myTeam/POST_NOTIFICATION_ON_SUCCESS'
export const POST_NOTIFICATION_ON_FAIL = 'myTeam/POST_NOTIFICATION_ON_FAIL'

export const POST_NOTIFICATION_OFF = 'myTeam/POST_NOTIFICATION_OFF'
export const POST_NOTIFICATION_OFF_SUCCESS = 'myTeam/POST_NOTIFICATION_OFF_SUCCESS'
export const POST_NOTIFICATION_OFF_FAIL = 'myTeam/POST_NOTIFICATION_OFF_FAIL'

export const GET_LEVEL = 'myTeam/GET_LEVEL'
export const GET_LEVEL_SUCCESS = 'myTeam/GET_LEVEL_SUCCESS'
export const GET_LEVEL_FAIL = 'myTeam/GET_LEVEL_FAIL'

export const POST_LEVEL = 'myTeam/POST_LEVEL'
export const POST_LEVEL_SUCCESS = 'myTeam/POST_LEVEL_SUCCESS'
export const POST_LEVEL_FAIL = 'myTeam/POST_LEVEL_FAIL'

export const DELETE_TEAMMATE = 'myTeam/DELETE_TEAMMATE'
export const DELETE_TEAMMATE_SUCCESS = 'myTeam/DELETE_TEAMMATE_SUCCESS'
export const DELETE_TEAMMATE_FAIL = 'myTeam/DELETE_TEAMMATE_FAIL'

export const CLEAR_LEVEL = 'myTeam/CLEAR_LEVEL'

export const GET_CONTEXT = 'myTeam/GET_CONTEXT'
export const GET_CONTEXT_SUCCESS = 'myTeam/GET_CONTEXT_SUCCESS'
export const GET_CONTEXT_FAIL = 'myTeam/GET_CONTEXT_FAIL'

export const SET_CONTEXT = 'myTeam/SET_CONTEXT'
export const SET_CONTEXT_SUCCESS = 'myTeam/SET_CONTEXT_SUCCESS'
export const SET_CONTEXT_FAIL = 'myTeam/SET_CONTEXT_FAIL'

export const CLEAR_MY_TEAM = 'myTeam/CLEAR_MY_TEAM'
export const CLEAR_CONTEXT = 'myTeam/CLEAR_CONTEXT'

export const myTeamGetMyTeam = () => ({
  type: GET_MY_TEAM
})

export const myTeamGetMyTeamSuccess = payload => ({
  type: GET_MY_TEAM_SUCCESS,
  payload
})

export const myTeamGetMyTeamFail = error => ({
  type: GET_MY_TEAM_FAIL,
  payload: {
    error
  }
})

export const myTeamPostNotificationOn = payload => ({
  type: POST_NOTIFICATION_ON,
  payload
})

export const myTeamPostNotificationOnSuccess = payload => ({
  type: POST_NOTIFICATION_ON_SUCCESS,
  payload
})

export const myTeamPostNotificationOnFail = error => ({
  type: POST_NOTIFICATION_ON_FAIL,
  payload: {
    error
  }
})

export const myTeamPostNotificationOff = payload => ({
  type: POST_NOTIFICATION_OFF,
  payload
})

export const myTeamPostNotificationOffSuccess = payload => ({
  type: POST_NOTIFICATION_OFF_SUCCESS,
  payload
})

export const myTeamPostNotificationOffFail = error => ({
  type: POST_NOTIFICATION_OFF_FAIL,
  payload: {
    error
  }
})

export const myTeamGetLevel = payload => ({
  type: GET_LEVEL,
  payload
})

export const myTeamGetLevelSuccess = payload => ({
  type: GET_LEVEL_SUCCESS,
  payload
})

export const myTeamGetLevelFail = error => ({
  type: GET_LEVEL_FAIL,
  payload: {
    error
  }
})

export const myTeamPostLevel = payload => ({
  type: POST_LEVEL,
  payload
})

export const myTeamPostLevelSuccess = payload => ({
  type: POST_LEVEL_SUCCESS,
  payload
})

export const myTeamPostLevelFail = error => ({
  type: POST_LEVEL_FAIL,
  payload: {
    error
  }
})

export const myTeamDeleteTeammate = payload => ({
  type: DELETE_TEAMMATE,
  payload
})

export const myTeamDeleteTeammateSuccess = () => ({
  type: DELETE_TEAMMATE_SUCCESS
})

export const myTeamDeleteTeammateFail = error => ({
  type: DELETE_TEAMMATE_FAIL,
  payload: {
    error
  }
})

export const myTeamClearLevel = payload => ({
  type: CLEAR_LEVEL,
  payload
})

export const myTeamGetContext = payload => ({
  type: GET_CONTEXT,
  payload
})

export const clearMyTeam = () => ({
  type: CLEAR_MY_TEAM
})

export const myTeamGetContextSuccess = payload => ({
  type: GET_CONTEXT_SUCCESS,
  payload
})

export const myTeamGetContextFail = error => ({
  type: GET_CONTEXT_FAIL,
  payload: {
    error
  }
})

export const myTeamSetContext = payload => ({
  type: SET_CONTEXT,
  payload
})

export const myTeamSetContextSuccess = payload => ({
  type: SET_CONTEXT_SUCCESS,
  payload
})

export const myTeamSetContextFail = error => ({
  type: SET_CONTEXT_FAIL,
  payload: {
    error
  }
})

export const clearContextMyTeam = () => ({
  type: CLEAR_CONTEXT
})
