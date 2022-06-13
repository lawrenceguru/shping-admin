import {
  GET_MY_TEAM,
  GET_MY_TEAM_SUCCESS,
  GET_MY_TEAM_FAIL,
  POST_NOTIFICATION_ON,
  POST_NOTIFICATION_ON_SUCCESS,
  POST_NOTIFICATION_ON_FAIL,
  POST_NOTIFICATION_OFF,
  POST_NOTIFICATION_OFF_SUCCESS,
  POST_NOTIFICATION_OFF_FAIL,
  POST_LEVEL,
  POST_LEVEL_SUCCESS,
  POST_LEVEL_FAIL,
  GET_LEVEL,
  GET_LEVEL_SUCCESS,
  GET_LEVEL_FAIL,
  DELETE_TEAMMATE,
  DELETE_TEAMMATE_SUCCESS,
  DELETE_TEAMMATE_FAIL,
  CLEAR_LEVEL,
  GET_CONTEXT,
  GET_CONTEXT_SUCCESS,
  GET_CONTEXT_FAIL,
  SET_CONTEXT,
  SET_CONTEXT_SUCCESS,
  SET_CONTEXT_FAIL,
  CLEAR_MY_TEAM,
  CLEAR_CONTEXT
} from './actions'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_MY_TEAM:
      return {
        ...state,
        isLoadingTeam: true
      }
    case GET_MY_TEAM_SUCCESS:
      return {
        ...state,
        team: payload,
        isLoadingTeam: false
      }
    case CLEAR_MY_TEAM:
      return {
        ...state,
        team: [],
        isLoadingTeam: false
      }
    case CLEAR_CONTEXT:
      return {
        ...state,
        context: [],
        isLoadingContext: false
      }
    case GET_MY_TEAM_FAIL:
      return {
        ...state,
        isLoadingTeam: false
      }
    case POST_NOTIFICATION_ON:
      return {
        ...state,
        isNotificationChanging: true
      }
    case POST_NOTIFICATION_ON_SUCCESS:
      return {
        ...state,
        isNotificationChanging: false
      }
    case POST_NOTIFICATION_ON_FAIL:
      return {
        ...state,
        isNotificationChanging: false
      }
    case POST_NOTIFICATION_OFF:
      return {
        ...state,
        isNotificationChanging: true
      }
    case POST_NOTIFICATION_OFF_SUCCESS:
      return {
        ...state,
        isNotificationChanging: false
      }
    case POST_NOTIFICATION_OFF_FAIL:
      return {
        ...state,
        isNotificationChanging: false
      }
    case POST_LEVEL:
      return {
        ...state,
        isLevelChanging: true
      }
    case POST_LEVEL_SUCCESS:
      return {
        ...state,
        isLevelChanging: false
      }
    case POST_LEVEL_FAIL:
      return {
        ...state,
        isLevelChanging: false
      }
    case GET_LEVEL:
      return {
        ...state,
        isLoadingLevels: true
      }
    case GET_LEVEL_SUCCESS:
      return {
        ...state,
        currentLevels: [...state.currentLevels, payload],
        isLoadingLevels: false
      }
    case GET_LEVEL_FAIL:
      return {
        ...state,
        isLoadingLevels: false
      }
    case DELETE_TEAMMATE:
      return {
        ...state,
        isTeammateDeleting: true
      }
    case DELETE_TEAMMATE_SUCCESS:
      return {
        ...state,
        isTeammateDeleting: false
      }
    case DELETE_TEAMMATE_FAIL:
      return {
        ...state,
        isTeammateDeleting: false
      }
    case CLEAR_LEVEL:
      return {
        ...state,
        currentLevels: []
      }
    case GET_CONTEXT:
      return {
        ...state,
        isLoadingContext: true
      }
    case GET_CONTEXT_SUCCESS:
      return {
        ...state,
        context: payload,
        isLoadingContext: false
      }
    case GET_CONTEXT_FAIL:
      return {
        ...state,
        isLoadingContext: false
      }
    case SET_CONTEXT:
      return {
        ...state,
        isChangingContext: true
      }
    case SET_CONTEXT_SUCCESS:
      return {
        ...state,
        isChangingContext: false
      }
    case SET_CONTEXT_FAIL:
      return {
        ...state,
        isChangingContext: false
      }
    default:
      return state
  }
}
