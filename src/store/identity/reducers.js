/* eslint-disable no-unused-vars */
import {
  IDENTITY_POST_SESSION,
  IDENTITY_POST_SESSION_SUCCESS,
  IDENTITY_POST_SESSION_FAIL,
  IDENTITY_GET_ACCOUNT_SUCCESS,
  IDENTITY_GET_ACCOUNT_FAIL,
  IDENTITY_DELETE_SESSION,
  IDENTITY_DELETE_SESSION_SUCCESS,
  IDENTITY_DELETE_SESSION_FAIL,
  IDENTITY_GET_SESSION_SUCCESS,
  IDENTITY_GET_SESSION_FAIL,
  IDENTITY_CHANGE_PARTICIPANT,
  IDENTITY_CHANGE_PARTICIPANT_SUCCESS,
  IDENTITY_CHANGE_PARTICIPANT_FAIL,
  IDENTITY_PUT_ACCOUNT,
  IDENTITY_PUT_ACCOUNT_SUCCESS,
  IDENTITY_PUT_ACCOUNT_FAIL,
  IDENTITY_POST_RESTORE_SEND_EMAIL,
  IDENTITY_POST_RESTORE_SEND_EMAIL_SUCCESS,
  IDENTITY_POST_RESTORE_SEND_EMAIL_FAIL,
  IDENTITY_PUT_RESTORE_PASSWORD,
  IDENTITY_PUT_RESTORE_PASSWORD_SUCCESS,
  IDENTITY_PUT_RESTORE_PASSWORD_FAIL
} from './actions'
import { initialState } from './selectors'

const clearState = {
  isLoading: false,
  isLoggingIn: false,
  id: null,
  name: null,
  roles: [],
  ticket: null,
  company_prefix: null,
  country: null,
  last_access: null,
  modules: [],
  parent: null,
  checked_prefix: null,
  participant_type: null,
  current_participant: null,
  participants: [],
  participants_on_review: [],
  checked_email: null,
  isCheckingEmail: false,
  ticketExpiredTime: null,
  defaultPage: '',
  enableTopup: null
}

let storageSession

try {
  storageSession = JSON.parse(localStorage.getItem('session'))
} catch (e) {
  storageSession = null
}

const init = storageSession
  ? {
      isLoading: false,
      message: 'You have been successfully logged in.',
      isAuthenticated: true,
      ...storageSession
    }
  : initialState

export default (state = init, { type, payload }) => {
  switch (type) {
    case IDENTITY_POST_SESSION:
      return {
        ...state,
        isLoading: true
      }
    case IDENTITY_POST_SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: 'You have been successfully logged in.',
        isAuthenticated: true,
        ...payload
      }
    case IDENTITY_POST_SESSION_FAIL:
      return {
        ...state,
        isLoading: false,
        message: `Authentication error: ${payload}`,
        isAuthenticated: false
      }
    case IDENTITY_GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        participants: payload.participants || null,
        account: payload
      }
    case IDENTITY_GET_ACCOUNT_FAIL:
      return {
        ...state,
        participants: []
      }
    case IDENTITY_PUT_ACCOUNT:
      return {
        ...state,
        isLoading: true,
        passwordUpdate: false
      }
    case IDENTITY_PUT_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        account: payload.data,
        passwordUpdate: payload.passwordUpdate
      }
    case IDENTITY_PUT_ACCOUNT_FAIL:
      return {
        ...state,
        isLoading: false,
        passwordUpdate: false
      }
    case IDENTITY_DELETE_SESSION:
      return {
        ...state,
        ...clearState,
        ticket: state && state.ticket ? state.ticket : null,
        isAuthenticated: false
      }
    case IDENTITY_DELETE_SESSION_SUCCESS:
    case IDENTITY_DELETE_SESSION_FAIL:
      return {
        ...state,
        ticket: null
      }
    case IDENTITY_GET_SESSION_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        participants: payload.participants || null,
        modules: payload.modules || []
      }
    case IDENTITY_GET_SESSION_FAIL:
      return {
        ...state,
        isAuthenticated: false
      }
    case IDENTITY_CHANGE_PARTICIPANT:
      return {
        ...state,
        isChangingParticipant: true
      }
    case IDENTITY_CHANGE_PARTICIPANT_SUCCESS:
      return {
        ...state,
        current_participant: payload.current_participant,
        modules: payload.modules,
        roles: payload.roles,
        isChangingParticipant: false
      }
    case IDENTITY_CHANGE_PARTICIPANT_FAIL:
      return {
        ...state,
        isChangingParticipant: false
      }
    case IDENTITY_POST_RESTORE_SEND_EMAIL:
      return {
        ...state,
        isLoading: true
      }
    case IDENTITY_POST_RESTORE_SEND_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case IDENTITY_POST_RESTORE_SEND_EMAIL_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case IDENTITY_PUT_RESTORE_PASSWORD:
      return {
        ...state,
        isLoading: true
      }
    case IDENTITY_PUT_RESTORE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case IDENTITY_PUT_RESTORE_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
