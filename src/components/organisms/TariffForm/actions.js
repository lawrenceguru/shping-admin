import axios from 'axios'
import { BILLING_API } from 'constants/url'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'
import moment from 'moment'

const create = (values, id, ticket, router) => {
  const data = { ...values, starts_at: moment(values.starts_at).format('YYYY-MM-DD') }
  axios
    .post(`${BILLING_API}/tariff/${id}`, data, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('tariff.alerts.addSuccess', { name: values.name }))
      router.push(`/admin/customers/list/${id}`)
    })
    .catch(() => {
      toast.error(intl.get('tariff.alerts.addFail'))
    })
}
const update = (values, id, tariff, ticket) => {
  const data = { ...values, starts_at: moment(values.starts_at).format('YYYY-MM-DD') }
  axios
    .patch(`${BILLING_API}/tariff/${id}/${tariff}`, data, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('tariff.alerts.updateSuccess', { name: values.name }))
    })
    .catch(error => {
      console.log(error, 'errpr')
      toast.error(intl.get('tariff.alerts.updateFail'))
    })
}
const remove = (tariff, id, ticket, mutate) => {
  axios
    .delete(`${BILLING_API}/tariff/${id}/${tariff.id}`, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('tariff.alerts.deleteSuccess', { name: tariff.name }))
      mutate(`${BILLING_API}/tariff`)
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`${error.response.data.error}`)
      } else {
        toast.error(intl.get('tariff.alerts.deleteFail'))
      }
    })
}
export { create, update, remove }
