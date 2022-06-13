import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Field } from 'redux-form'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input'
import Typography from '../../atoms/Typography'
import { StyledForm, StyledTitle, StyledText } from './style'

const RestoreEmailSendForm = ({ handleSubmit, pristine, submitting, valid }) => {
  const isLoading = useSelector(({ identity }) => identity.isLoading)
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTitle>
        <Typography.Text strong>{intl.get('restorePasswordPage.title')}</Typography.Text>
      </StyledTitle>
      <StyledText>{intl.get('restorePasswordPage.form.pleaseEnter')}</StyledText>
      <Field
        name='newPassword'
        label={intl.get('restorePasswordPage.form.newPasswordLabel')}
        placeholder={intl.get('restorePasswordPage.form.newPasswordPlaceholder')}
        component={Input}
        type='password'
      />
      <Field
        name='confirmPassword'
        type='password'
        component={Input}
        label={intl.get('restorePasswordPage.form.confirmPasswordLabel')}
        placeholder={intl.get('restorePasswordPage.form.confirmPasswordPlaceholder')}
      />
      <Button htmlType='submit' type='danger' disabled={pristine || !valid} loading={submitting} block>
        {isLoading ? <Spin /> : intl.get('restorePasswordPage.form.submit')}
      </Button>
    </StyledForm>
  )
}

RestoreEmailSendForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired
}

export default RestoreEmailSendForm
