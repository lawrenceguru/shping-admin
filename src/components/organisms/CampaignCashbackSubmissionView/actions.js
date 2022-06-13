import axios from 'axios'
import { REWARDS_API } from 'constants/url'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'

const accept = (values, ticket, isList, cashback, mutate, callback) => {
  axios
    .post(`${REWARDS_API}/cashbacks/submissions/status`, values, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.acceptCashbackSubmissionAcceptSuccess'))
      if (isList) mutate([`${REWARDS_API}/cashbacks/submissions/get`, ...cashback])
      else mutate([`${REWARDS_API}/cashbacks/submissions/get`, values.id])
      callback()
    })
    .catch(() => {
      toast.error(intl.get('alerts.acceptCashbackSubmissionAcceptFail'))
    })
}
const reject = (values, ticket, isList, cashback, mutate, callback, errorCallback) => {
  axios
    .post(`${REWARDS_API}/cashbacks/submissions/status`, values, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.rejectCashbackSubmissionAcceptSuccess'))
      if (isList) mutate([`${REWARDS_API}/cashbacks/submissions/get`, ...cashback])
      else mutate([`${REWARDS_API}/cashbacks/submissions/get`, values.id])
      callback()
    })
    .catch(() => {
      toast.error(intl.get('alerts.rejectCashbackSubmissionAcceptFail'))
      errorCallback()
    })
}
const save = (values, ticket, mutate, callback) => {
  axios
    .put(`${REWARDS_API}/cashbacks/submissions`, values, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.rejectCashbackSubmissionAcceptSuccess'))
      mutate([`${REWARDS_API}/cashbacks/submissions/get`, values.id])
      callback()
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`${error.response.data.error}`)
      } else {
        console.log(error)
        toast.error(intl.get('alerts.deleteReviewTemplateFail'))
      }
    })
}

export { accept, reject, save }
