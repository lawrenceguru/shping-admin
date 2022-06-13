import axios from 'axios'
import { REVIEWS_API } from 'constants/url'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'

const create = (values, ticket, router) => {
  axios
    .post(`${REVIEWS_API}/templates`, values, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.addReviewTemplateSuccess', { name: values.name }))
      router.push(`/admin/reviews/templates`)
    })
    .catch(() => {
      toast.error(intl.get('alerts.addReviewTemplateFail'))
    })
}
const update = (values, ticket, template, mutate) => {
  axios
    .put(`${REVIEWS_API}/templates/${template.id}`, values, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.updateReviewTemplateSuccess', { name: values.name }))
      mutate(`${REVIEWS_API}/templates`)
    })
    .catch(() => {
      toast.error(intl.get('alerts.updateReviewTemplateFail'))
    })
}
const remove = (template, ticket, mutate) => {
  axios
    .delete(`${REVIEWS_API}/templates/${template.id}`, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    .then(() => {
      toast.success(intl.get('alerts.deleteReviewTemplateSuccess', { name: template.name }))
      mutate(`${REVIEWS_API}/templates`)
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

export { create, update, remove }
