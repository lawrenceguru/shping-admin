import axios from 'axios'
import { SHOPPINGLISTS_API } from 'constants/url'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'

const create = (values, audience, ticket, router) => {
  const data = values
  data.audience = [audience]
  axios
    .put(`${SHOPPINGLISTS_API}/advertisement`, data, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.addShoppingListAdSuccess', { name: values.name }))
      router.push(`/admin/campaigns/shopping-list-ads`)
    })
    .catch(() => {
      toast.error(intl.get('alerts.addShoppingListAdFail'))
    })
}
const update = (values, audience, ticket, mutate) => {
  const data = values
  /* eslint-disable-next-line no-underscore-dangle */
  data.id = values._id
  data.audience = [audience]
  axios
    .patch(`${SHOPPINGLISTS_API}/advertisement`, data, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.updateShoppingListAdSuccess', { name: values.name }))
      mutate(`${SHOPPINGLISTS_API}/advertisement?offset=0&limit=1&id=${data.id}`)
    })
    .catch(error => {
      console.log(error, 'errpr')
      toast.error(intl.get('alerts.updateShoppingListAdFail'))
    })
}
const remove = (ad, ticket, mutate) => {
  axios
    .delete(`${SHOPPINGLISTS_API}/advertisement`, {
      headers: {
        authenticateit_identity_ticket: ticket
      },
      data: {
        /* eslint-disable-next-line no-underscore-dangle */
        id: ad._id
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.deleteShoppingListAdSuccess', { name: ad.name }))
      mutate(`${SHOPPINGLISTS_API}/advertisement`)
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`${error.response.data.error}`)
      } else {
        console.log(error)
        toast.error(intl.get('alerts.deleteShoppingListAdFail'))
      }
    })
}
const updateAction = (ad, ticket, mutate) => {
  const status = ad.status === 'active' ? 'inactive' : 'active'
  const data = {
    /* eslint-disable-next-line no-underscore-dangle */
    id: ad._id,
    status
  }
  axios
    .patch(`${SHOPPINGLISTS_API}/advertisement`, data, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      mutate(`${SHOPPINGLISTS_API}/advertisement?offset=0&limit=1&id=${data.id}`)
    })
    .catch(() => {
      toast.error(intl.get('alerts.updateShoppingListAdFail'))
    })
}

export { create, update, remove, updateAction }
