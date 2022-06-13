import React from 'react'
import { reduxForm } from 'redux-form'
import { onSubmitActions } from 'redux-form-submit-saga'

import LoginForm from '../components/organisms/LoginForm'

const LoginFormContainer = props => {
  return <LoginForm {...props} />
}

export default reduxForm({
  form: 'LoginForm',
  onSubmit: onSubmitActions('auth/LOGIN_FORM')
})(LoginFormContainer)
