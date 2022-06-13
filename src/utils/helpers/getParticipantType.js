import { isEmpty } from 'lodash'

// eslint-disable-next-line import/prefer-default-export
export function getParticipantType(participant) {
  if (!isEmpty(participant) && participant.participant_type && participant.participant_type.length) {
    if (participant.participant_type.includes('system')) {
      return 'system'
    }
    if (participant.participant_type.includes('expert')) {
      return 'expert'
    }
    if (participant.participant_type.includes('product360')) {
      return 'brand'
    }
    return 'brand'
  }
  return null
}
