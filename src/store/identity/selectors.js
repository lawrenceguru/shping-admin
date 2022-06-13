/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { createSelector } from 'reselect'

export const initialState = {
  isLoading: false,
  country: null,
  current_participant: null,
  email: null,
  first_name: null,
  id: null,
  language: null,
  last_name: null,
  name: null,
  phone: null,
  points: null,
  roles: null,
  ticket: null,
  message: null,
  participants: [],
  enableTopup: null,
  isAuthenticated: false,
  isChangingParticipant: false,
  passwordUpdate: false
}

export const getIdentity = state => state || initialState
export const getTicket = state => state.ticket || initialState.ticket
export const getCurrentParticipant = state => state.current_participant || initialState.current_participant

export const participantSelector = createSelector(
  getIdentity,
  ({ participants, current_participant }) =>
    participants
      ? participants.find(p => {
          return p.id === current_participant
        })
      : { participant_type: [] }
)

export const isSystem = createSelector(
  getIdentity,
  ({ participants, current_participant }) => {
    const participant = participants
      ? participants.find(p => {
          return p.id === current_participant
        })
      : {}
    return participant && participant.participant_type ? participant.participant_type.includes('system') : false
  }
)

export const getParticipantType = createSelector(
  getIdentity,
  ({ participants, current_participant }) => {
    const participant = participants
      ? participants.find(p => {
        return p.id === current_participant
      })
      : {}
    return participant && participant.participant_type
  }
)

export const isHaveSystem = createSelector(
  getIdentity,
  ({ participants }) => {
    const participant = participants
      ? participants.find(p => {
        return p.participant_type && p.participant_type.includes('system')
      })
      : null
    return !!participant
  }
)

export const logoSelector = createSelector(
  getIdentity,
  ({ participants, current_participant }) => {
    const participant = participants
      ? participants.find(p => {
          return p.id === current_participant
        })
      : {}
    return participant && participant.logo
  }
)

export const isSupervisor = createSelector(
  getIdentity,
  ({ participants, current_participant }) => {
    const participant = participants
      ? participants.find(p => {
          return p.id === current_participant
        })
      : {}
    return participant && participant.roles ? participant.roles.includes('contributors_supervisor') : false
  }
)

export const getSettingsProfileFormValues = state => {
  const currentAccount = state && state.account
  return currentAccount && {
    first_name: currentAccount.first_name,
    last_name: currentAccount.last_name,
    phone: currentAccount.phone,
    city: currentAccount.city,
    post_code: currentAccount.post_code,
    address1: currentAccount.address1,
    address2: currentAccount.address2,
    language: currentAccount.language,
    job_title: currentAccount.job_title
  }
}

export const isAuthenticated = state => state.isAuthenticated || initialState.isAuthenticated
