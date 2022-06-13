export const PAYMENTS_GET_PARTICIPANT_PLAN = 'payments/GET_PARTICIPANT_PLAN'
export const PAYMENTS_GET_PARTICIPANT_PLAN_SUCCESS = 'payments/GET_PARTICIPANT_PLAN_SUCCESS'
export const PAYMENTS_GET_PARTICIPANT_PLAN_FAIL = 'payments/GET_PARTICIPANT_PLAN_FAIL'

export const paymentsGetParticipantPlan = payload => ({
  type: PAYMENTS_GET_PARTICIPANT_PLAN,
  payload
})

export const paymentsGetParticipantPlanSuccess = payload => ({
  type: PAYMENTS_GET_PARTICIPANT_PLAN_SUCCESS,
  payload
})

export const paymentsGetParticipantPlanFail = payload => ({
  type: PAYMENTS_GET_PARTICIPANT_PLAN_FAIL,
  payload
})
