import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Field } from 'redux-form'
import { Icon, Spin } from 'antd'
import { required } from 'utils/validation'
import { useSelector } from 'react-redux'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input'
import Typography from '../../atoms/Typography'
import { StyledForm, StyledTitle, StyledText } from './style'

const MailIcon = <Icon type='mail' theme='filled' />

const RestoreEmailSendForm = ({ handleSubmit, pristine, submitting, valid, match }) => {
  console.log(match)
  const isLoading = useSelector(({ identity }) => identity.isLoading)
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTitle>
        <Typography.Text strong>{intl.get('restoreSendEmailPage.title')}</Typography.Text>
      </StyledTitle>
      <StyledText>{intl.get('restoreSendEmailPage.form.pleaseEnter')}</StyledText>
      <Field
        name='email'
        type='email'
        component={Input}
        label={intl.get('restoreSendEmailPage.form.emailLabel')}
        placeholder={intl.get('restoreSendEmailPage.form.emailPlaceholder')}
        iconRight={MailIcon}
        validate={required}
      />
      <Button htmlType='submit' type='danger' disabled={pristine || !valid} loading={submitting} block>
        {isLoading ? <Spin /> : intl.get('restoreSendEmailPage.form.submit')}
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
