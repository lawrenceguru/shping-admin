import axios from 'axios'
import { BILLING_API } from 'constants/url'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'

const save = (values, ticket, id, mutate, successCallback, failCallback) => {
  axios
    .post(`${BILLING_API}/billing/company`, values, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      if (id) toast.success(intl.get('customer.xero.updateSuccess'))
      else toast.success(intl.get('customer.xero.createSuccess'))
      successCallback()
      mutate(`${BILLING_API}/billing/company/${values.participant_id}`)
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error_data) {
          toast.error(`
            ${error.response.data.error} ${error.response.data.error_data.join(' ')}
          `)
        } else {
          toast.error(`${error.response.data.error}`)
        }
      } else {
        toast.error(intl.get('customer.xero.failed'))
      }
      failCallback()
    })
}
const disconnect = (id, ticket, mutate, successCallback) => {
  axios
    .delete(`${BILLING_API}/billing/company/${id}`, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('customer.xero.disconnectSuccess'))
      successCallback()
      mutate(`${BILLING_API}/billing/company/${id}`)
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error_data) {
          toast.error(`
            ${error.response.data.error} ${error.response.data.error_data.join(' ')}
          `)
        } else {
          toast.error(`${error.response.data.error}`)
        }
      } else {
        toast.error(intl.get('customer.xero.failedDisconnect'))
      }
    })
}

export { save, disconnect }
