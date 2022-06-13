import React from 'react'
import { reduxForm } from 'redux-form'
import { onSubmitActions } from 'redux-form-submit-saga'

import RestoreEmailSendForm from '../components/organisms/RestoreEmailSendForm'

const RestoreEmailSendFormContainer = props => {
  return <RestoreEmailSendForm {...props} />
}
const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const warn = () => {
  const warnings = {}
  return warnings
}

export default reduxForm({
  form: 'RestoreEmailSendForm',
  validate,
  warn,
  onSubmit: onSubmitActions('identity/RESTORE_SEND_EMAIL_FORM')
})(RestoreEmailSendFormContainer)
