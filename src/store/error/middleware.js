import intl from 'react-intl-universal'
import { toast } from 'react-toastify'

// eslint-disable-next-line no-unused-vars
export default store => next => action => {
  if (action.error) {
    if (action.type === '@@redux-form/SET_SUBMIT_FAILED' && action.meta) {
      const { form, fields } = action.meta

      if (form === 'productSourceForm') {
        return next(action)
      }

      if (fields && fields.length > 0) {
        toast.error(intl.get('validation.submitError'))

        return next(action)
      }

      return next(action)
    }

    const { response, message } = action.error
    const error =
      (response && response.data && response.data.error) || (action.payload && action.payload.error) || message
    const errorId = (response && response.data && response.data.error_id) || (action.payload && action.payload.error_id)

    if (errorId) {
      if (errorId === 'common-missing_ticket' || errorId === 'common-expired_session') {
        return next(action)
      }
      if (errorId === 'description-gtin_limit') {
        return next(action)
      }
      if (errorId === 'common-invalid_input') {
        const errorData = response && response.data && response.data.error_data
        const localizedMessage = intl.get(`serverErrors.${errorId}`, { param: errorData && errorData[0] })

        toast.error(localizedMessage || error)
      } else if (!(errorId === 'common-unknown' && error === 'GTIN already exists')) {
        const errorMessage = intl.get(`serverErrors.${errorId}`) || error

        toast.error(errorMessage)
      }
    }
  }

  return next(action)
}
