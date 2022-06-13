import axios from 'axios'
import { REWARDS_API } from 'constants/url'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'

const isBlank = value => {
  if (value === 0) {
    return true
  }
  if (value === null) {
    return true
  }
  if (Array.isArray(value) && !value?.length) {
    return true
  }
  return false
}

// Handling nils and nulls
const parseData = values => {
  const data = values
  data.all_products = false
  if (data.locations === undefined || data.locations.length === 0) {
    delete data.locations
  }
  if (data.options.max_claims === null) {
    delete data.options.max_claims
  }

  if (data.options.max_claims === null) {
    delete data.options.max_claims
  }
  if (data.options.claims_per_gtin === null) {
    delete data.options.claims_per_gtin
  }
  if (data.options.claims_per_user === null) {
    delete data.options.claims_per_user
  }
  if (data.options.claims_per_user === null) {
    delete data.options.claims_per_user
  }
  if (data.options.cap_in_receipt === null) {
    delete data.options.cap_in_receipt
  }
  if (isBlank(data.audience.min_age)) {
    delete data.audience.min_age
  }
  if (isBlank(data.audience.user_levels)) {
    delete data.audience.user_levels
  }
  if (isBlank(data.audience.city)) {
    delete data.audience.city
  }
  if (isBlank(data.audience.languages)) {
    delete data.audience.languages
  }
  if (isBlank(data.audience.countries)) {
    delete data.audience.countries
  }
  if (isBlank(data.audience.postcode)) {
    delete data.audience.postcode
  }
  if (isBlank(data.options.retailers)) {
    delete data.options.retailers
  }
  if (isBlank(data.options.receipt_postcode)) {
    delete data.options.receipt_postcode
  }
  if (!isBlank(data.audience.gender) && Array.isArray(data.audience.gender)) {
    data.audience.gender = data.audience.gender.filter(sex => sex !== 'all')
  }
  if (isBlank(data.audience.gender)) {
    delete data.audience.gender
  }

  return data
}

const create = (values, ticket, router) => {
  const data = parseData(values)
  data.status = 'active'
  axios
    .post(`${REWARDS_API}/cashbacks`, data, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.addCampaignCashbackSuccess', { name: values.name }))
      router.push(`/admin/campaigns/cashbacks`)
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
        toast.error(intl.get('alerts.addCampaignCashbackFail'))
      }
    })
}
const publishCreateAction = (values, ticket, router) => {
  const data = parseData(values)
  data.status = 'active'
  axios
    .post(`${REWARDS_API}/cashbacks`, data, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(response => {
      axios
        .put(
          `${REWARDS_API}/cashbacks/published/${response.data.id}`,
          {},
          {
            headers: {
              authenticateit_identity_ticket: ticket
            }
          }
        )
        .then(() => {
          toast.success(intl.get('alerts.publishedCampaignCashbackSuccess', { name: values.name }))
          router.push(`/admin/campaigns/cashbacks`)
        })
        .catch(() => {
          toast.error(intl.get('alerts.publishedCampaignCashbackFail'))
        })
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response)
        if (error.response.data.error_data) {
          toast.error(`
            ${error.response.data.error} ${error.response.data.error_data.join(' ')}
          `)
        } else {
          toast.error(`${error.response.data.error}`)
        }
      } else {
        console.log(error)
        toast.error(intl.get('alerts.addCampaignCashbackFail'))
      }
    })
}
const update = (values, ticket, mutate) => {
  const data = parseData(values)
  axios
    .put(`${REWARDS_API}/cashbacks/${data.id}`, data, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.updateCampaignCashbackSuccess', { name: values.name }))
      mutate(`${REWARDS_API}/cashbacks/${data.id}`)
    })
    .catch(error => {
      console.log(error, 'errpr')
      toast.error(intl.get('alerts.updateCampaignCashbackFail'))
    })
}
const publishUpdateAction = (values, ticket, router) => {
  const data = values
  axios
    .put(`${REWARDS_API}/cashbacks/${data.id}`, data, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      axios
        .put(
          `${REWARDS_API}/cashbacks/published/${values.id}`,
          {},
          {
            headers: {
              authenticateit_identity_ticket: ticket
            }
          }
        )
        .then(() => {
          toast.success(intl.get('alerts.publishedCampaignCashbackSuccess', { name: values.name }))
          router.push(`/admin/campaigns/cashbacks`)
        })
        .catch(() => {
          toast.error(intl.get('alerts.publishedCampaignCashbackFail'))
        })
    })
    .catch(error => {
      console.log(error, 'errpr')
      toast.error(intl.get('alerts.updateCampaignCashbackFail'))
    })
}

const remove = (data, ticket, mutate) => {
  axios
    .delete(`${REWARDS_API}/cashbacks/${data.id}`, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.deleteCampaignCashbackSuccess', { name: data.name }))
      mutate(`${REWARDS_API}/cashbacks`)
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`${error.response.data.error}`)
      } else {
        console.log(error)
        toast.error(intl.get('alerts.deleteCampaignCashbackFail'))
      }
    })
}
const updateAction = (cashback, ticket, mutate) => {
  const status = cashback.status === 'active' ? 'inactive' : 'active'
  const data = {
    ...cashback,
    status
  }
  axios
    .put(`${REWARDS_API}/cashbacks/${cashback.id}`, data, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      mutate(`${REWARDS_API}/cashbacks?offset=0&limit=1&id=${data.id}`)
    })
    .catch(() => {
      toast.error(intl.get('alerts.updateCampaignCashbackFail'))
    })
}

export { create, update, remove, updateAction, publishCreateAction, publishUpdateAction }
