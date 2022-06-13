import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Field } from 'redux-form'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import { required } from 'utils/validation'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input'
import InputPassword from '../../atoms/InputPassword'
import Typography from '../../atoms/Typography'
import { StyledForm, StyledTitle, StyledText } from './style'

const MailIcon = <Icon type='mail' theme='filled' />

const LoginForm = ({ handleSubmit, pristine, submitting, valid }) => {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTitle>
        <Typography.Text strong>{intl.get('loginPage.form.signInToContinue')}</Typography.Text>
      </StyledTitle>
      <StyledText>{intl.get('loginPage.form.email')}</StyledText>
      <Field
        name='email'
        type='email'
        component={Input}
        placeholder={intl.get('loginPage.form.emailPlaceholder')}
        iconRight={MailIcon}
        validate={required}
      />
      <StyledText>{intl.get('loginPage.form.password')}</StyledText>
      <Field
        name='password'
        type='password'
        component={InputPassword}
        placeholder={intl.get('loginPage.form.passwordPlaceholder')}
        validate={required}
      />
      <Link to='/reset-password' className='link' style={{ marginBottom: '15px', marginLeft: '10px' }}>
        {intl.get('loginPage.form.forgotPassword')}
      </Link>
      <Button htmlType='submit' type='danger' disabled={pristine || !valid} loading={submitting} block>
        {intl.get('loginPage.form.signIn')}
      </Button>
    </StyledForm>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired
}

export default LoginForm
