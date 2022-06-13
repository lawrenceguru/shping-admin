import axios from 'axios'
import { REWARDS_API } from 'constants/url'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'

function checkAudience(audience) {
  const { gender, languages, max_age: maxAge, min_age: minAge, user_levels: userLevels } = audience
  return {
    ...(gender && { gender }),
    ...(languages && languages.length && { languages }),
    ...(maxAge && { maxAge }),
    ...(minAge && { minAge }),
    ...(userLevels && userLevels.length && { userLevels })
  }
}
const create = (values, ticket, router) => {
  const data = values
  data.status = 'active'
  data.percents = Number(values.percents)
  data.start_date = data.date[0].format('YYYY-MM-DD')
  data.end_date = data.date[1].format('YYYY-MM-DD')
  delete data.date
  if (data.locations?.length === 0) {
    delete data.locations
  }
  if (data.locations) {
    data.locations.map(res => {
      const temp = res
      if (res.retailers?.length === 0) {
        delete temp.retailers
      }
      if (res.cities?.length === 0) {
        delete temp.cities
      }
      if (res.postcodes?.length === 0) {
        delete temp.postcodes
      }
      if (res.states?.length === 0) {
        delete temp.states
      }
      return res
    })
  }
  const audience = checkAudience(data.audience)
  const reData = { ...data, audience }
  axios
    .post(`${REWARDS_API}/boosters`, reData, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.addCampaignCashoutSuccess', { name: reData.name }))
      router.push(`/admin/campaigns/cashout`)
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error_data && error.response.data.error_data.includes('product')) {
          toast.error(`Product GTIN name is invalid value. You have to use valid product GTIN name.`)
        } else {
          toast.error(`${error.response.data.error}`)
        }
      } else {
        toast.error(intl.get('alerts.addCampaignCashoutFail'))
      }
    })
}
const publishCreateAction = (values, ticket, router) => {
  const data = values
  data.status = 'active'
  data.percents = Number(values.percents)
  data.start_date = data.date[0].format('YYYY-MM-DD')
  data.end_date = data.date[1].format('YYYY-MM-DD')
  delete data.date
  if (data.locations?.length === 0) {
    delete data.locations
  }
  if (data.locations) {
    data.locations.map(res => {
      const temp = res
      if (res.retailers?.length === 0) {
        delete temp.retailers
      }
      if (res.cities?.length === 0) {
        delete temp.cities
      }
      if (res.postcodes?.length === 0) {
        delete temp.postcodes
      }
      if (res.states?.length === 0) {
        delete temp.states
      }
      return res
    })
  }
  const audience = checkAudience(data.audience)
  const reData = { ...data, audience }
  axios
    .post(`${REWARDS_API}/boosters`, reData, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(response => {
      axios
        .put(
          `${REWARDS_API}/boosters/published/${response.data.id}`,
          {},
          {
            headers: {
              authenticateit_identity_ticket: ticket
            }
          }
        )
        .then(() => {
          toast.success(intl.get('alerts.publishedCampaignCashoutSuccess', { name: values.name }))
          router.push(`/admin/campaigns/cashout`)
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error)
          } else {
            toast.error(intl.get('alerts.publishedCampaignCashoutFail'))
          }
        })
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error_data && error.response.data.error_data.includes('product')) {
          toast.error(`Product GTIN name is invalid value. You have to use valid product GTIN name.`)
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
  // const data = parseData(values)
  const data = values
  data.percents = Number(values.percents)
  if (data.locations?.length === 0) {
    delete data.locations
  }
  if (data.locations) {
    data.locations.map(res => {
      const temp = res
      if (res.retailers?.length === 0) {
        delete temp.retailers
      }
      if (res.cities?.length === 0) {
        delete temp.cities
      }
      if (res.postcodes?.length === 0) {
        delete temp.postcodes
      }
      if (res.states?.length === 0) {
        delete temp.states
      }
      return res
    })
  }
  const audience = checkAudience(data.audience)
  const reData = { ...data, audience }
  axios
    .put(`${REWARDS_API}/boosters/${reData.id}`, reData, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.updateCampaignCashoutSuccess', { name: reData.name }))
      mutate(`${REWARDS_API}/boosters/${reData.id}`)
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error_data && error.response.data.error_data.includes('product')) {
          toast.error(`Product GTIN name is invalid value. You have to use valid product GTIN name.`)
        } else {
          toast.error(`${error.response.data.error}`)
        }
      } else {
        toast.error(intl.get('alerts.updateCampaignCashoutFail'))
      }
    })
}
const publishUpdateAction = (values, ticket, router) => {
  const data = values
  data.percents = Number(values.percents)
  data.start_date = data.date[0].format('YYYY-MM-DD')
  data.end_date = data.date[1].format('YYYY-MM-DD')
  delete data.date
  if (data.locations?.length === 0) {
    delete data.locations
  }
  if (data.locations) {
    data.locations.map(res => {
      const temp = res
      if (res.retailers?.length === 0) {
        delete temp.retailers
      }
      if (res.cities?.length === 0) {
        delete temp.cities
      }
      if (res.postcodes?.length === 0) {
        delete temp.postcodes
      }
      if (res.states?.length === 0) {
        delete temp.states
      }
      return res
    })
  }
  const audience = checkAudience(data.audience)
  const reData = { ...data, audience }
  axios
    .put(`${REWARDS_API}/boosters/${reData.id}`, reData, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      axios
        .put(
          `${REWARDS_API}/boosters/published/${reData.id}`,
          {},
          {
            headers: {
              authenticateit_identity_ticket: ticket
            }
          }
        )
        .then(() => {
          toast.success(intl.get('alerts.publishedCampaignCashbackSuccess', { name: reData.name }))
          router.push(`/admin/campaigns/cashout`)
        })
        .catch(error => {
          toast.error(error.response.data.error)
        })
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error_data && error.response.data.error_data.includes('product')) {
          toast.error(`Product GTIN name is invalid value. You have to use valid product GTIN name.`)
        } else {
          toast.error(`${error.response.data.error}`)
        }
      } else {
        toast.error(error.response.data.error)
      }
    })
}

const remove = (data, ticket, mutate) => {
  axios
    .delete(`${REWARDS_API}/boosters/${data.id}`, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.deleteCampaignCashoutSuccess', { name: data.name }))
      mutate(`${REWARDS_API}/boosters`)
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`${error.response.data.error}`)
      } else {
        console.log(error)
        toast.error(intl.get('alerts.deleteCampaignCashoutFail'))
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
    .put(`${REWARDS_API}/boosters/${cashback.id}`, data, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      mutate(`${REWARDS_API}/boosters?offset=0&limit=1&id=${data.id}`)
    })
    .catch(() => {
      toast.error(intl.get('alerts.updateCampaignCashbackFail'))
    })
}
const updateReviewAction = (cashback, ticket, mutate) => {
  const status = cashback.status === 'active' ? 'inactive' : 'active'
  const data = {
    ...cashback,
    status
  }
  axios
    .put(`${REWARDS_API}/boosters/${cashback.id}`, data, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      mutate(`${REWARDS_API}/boosters/${cashback.id}`)
      mutate(`${REWARDS_API}/boosters/products/preview`)
    })
    .catch(() => {
      toast.error(intl.get('alerts.updateCampaignCashbackFail'))
    })
}

export { create, update, remove, updateAction, publishCreateAction, publishUpdateAction, updateReviewAction }
