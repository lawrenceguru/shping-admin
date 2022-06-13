import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { onSubmitActions } from 'redux-form-submit-saga'

import RestorePasswordForm from '../components/organisms/RestorePasswordForm'

const RestorePasswordFormContainer = props => {
  return <RestorePasswordForm {...props} />
}

const validate = values => {
  const errors = {}
  if (!values.newPassword) {
    errors.newPassword = 'Required'
  } else if (values.newPassword.length < 6) {
    errors.newPassword = 'Must be 6 symbols or more'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  } else if (values.confirmPassword.length < 6) {
    errors.confirmPassword = 'Must be 6 symbols or more'
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = `"Passwords don't match"`
  }
  return errors
}

const warn = () => {
  const warnings = {}
  return warnings
}

const RestorePasswordFormInstance = reduxForm({
  form: 'RestorePasswordForm',
  validate,
  warn,
  onSubmit: onSubmitActions('identity/RESTORE_PASSWORD_FORM')
})(RestorePasswordFormContainer)

export default connect((state, ownProps) => ({
  initialValues: { code: ownProps.code },
  isLoading: state.identity.isLoading
}))(RestorePasswordFormInstance)
