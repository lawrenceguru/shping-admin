import React, { useCallback, useEffect, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { RHFInput } from 'react-hook-form-input'
import intl from 'react-intl-universal'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import { StyledForm, Wrapper, ButtonWrapper } from './styles'
import Error from '../../atoms/Error'
import Button from '../../atoms/Button'

const { Password } = Input

const INITIAL_VALUES = {
  password: null,
  old_password: null,
  confirmPassword: null
}

const ProfilePassword = ({ identityPutAccount, passwordUpdate }) => {
  const {
    watch,
    errors,
    getValues,
    setValue,
    register,
    clearError,
    setError,
    unregister,
    reset,
    triggerValidation
  } = useForm({
    defaultValues: INITIAL_VALUES,
    reValidateMode: 'onChange'
  })

  const all = watch()
  const passwordWatcher = watch('password')
  const oldPasswordWatcher = watch('old_password')
  const confirmPasswordWatcher = watch('confirmPassword')

  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])

  useEffect(() => {
    return () => {
      reset(null)
    }
  }, [])

  useEffect(() => {
    if (passwordWatcher && oldPasswordWatcher && passwordWatcher === oldPasswordWatcher) {
      setError('password', 'custom', intl.get('profilePassword.validation.samePassword'))
    } else if (passwordWatcher) {
      clearError('password')
    }
  }, [passwordWatcher, oldPasswordWatcher])

  useEffect(() => {
    if (passwordWatcher && confirmPasswordWatcher && passwordWatcher !== confirmPasswordWatcher) {
      setError('confirmPassword', 'custom', intl.get('profilePassword.validation.differentConfirmPassword'))
    } else if (confirmPasswordWatcher) {
      clearError('confirmPassword')
    }
  }, [passwordWatcher, confirmPasswordWatcher])

  useEffect(() => {
    if (passwordUpdate) {
      setValue('password', null)
      setValue('confirmPassword', null)
      setValue('old_password', null)
    }
  }, [passwordUpdate])

  const onSubmit = useCallback(() => {
    const data = { ...values }
    delete data.confirmPassword

    identityPutAccount({ ...data })
  }, [values])

  const handleSubmit = useCallback(() => {
    triggerValidation().then(isValid => {
      if (isValid) {
        onSubmit()
      }
    })
  }, [onSubmit])

  return (
    <Wrapper>
      <StyledForm>
        <Form.Item label={intl.get('profilePassword.fields.currentPassword.label')}>
          <RHFInput
            as={<Password size='large' placeholder={intl.get('profilePassword.fields.currentPassword.label')} />}
            name='old_password'
            rules={{
              required: intl.get('todo.cards.form.required')
            }}
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.old_password}
            mode='onChange'
          />
          <Error errors={errors} destination='old_password' />
        </Form.Item>
        <Form.Item label={intl.get('profilePassword.fields.newPassword.label')}>
          <RHFInput
            as={<Password size='large' placeholder={intl.get('profilePassword.fields.newPassword.label')} />}
            name='password'
            rules={{
              required: intl.get('todo.cards.form.required')
            }}
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.password}
            mode='onChange'
          />
          <Error errors={errors} destination='password' />
        </Form.Item>
        <Form.Item label={intl.get('profilePassword.fields.confirmPassword.label')}>
          <RHFInput
            as={<Password size='large' placeholder={intl.get('profilePassword.fields.confirmPassword.label')} />}
            name='confirmPassword'
            rules={{
              required: intl.get('todo.cards.form.required')
            }}
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.confirmPassword}
            mode='onChange'
          />
          <Error errors={errors} destination='confirmPassword' />
        </Form.Item>
      </StyledForm>
      <ButtonWrapper>
        <Button type='danger' size='large' onClick={handleSubmit}>
          {intl.get('profilePassword.submitButton')}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

ProfilePassword.propTypes = {
  identityPutAccount: PropTypes.func.isRequired,
  passwordUpdate: PropTypes.bool
}

ProfilePassword.defaultProps = {
  passwordUpdate: false
}

export default withRouter(ProfilePassword)
