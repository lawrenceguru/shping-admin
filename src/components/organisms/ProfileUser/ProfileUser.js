import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { RHFInput } from 'react-hook-form-input'
import intl from 'react-intl-universal'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import { StyledForm, Wrapper, ButtonWrapper } from './styles'
import Error from '../../atoms/Error'
import ProfileUserSummary from '../ProfileUserSummary'
import Button from '../../atoms/Button'

const { Option } = Select

const INITIAL_VALUES = {
  first_name: null,
  last_name: null,
  job_title: null,
  phone: null,
  language: null,
  address1: null,
  address2: null,
  city: null,
  post_code: null
}

// eslint-disable-next-line no-unused-vars
const ProfileUser = ({ languages, isLoadingLanguages, settingsGetLanguages, initialValues, identityPutAccount }) => {
  const [language, setLanguage] = useState('')

  const initialState = useMemo(() => {
    setLanguage(initialValues && initialValues.language)
    return { ...INITIAL_VALUES, ...initialValues, language: null }
  }, [initialValues])

  const { watch, errors, getValues, setValue, register, unregister, reset } = useForm({
    defaultValues: initialState,
    reValidateMode: 'onChange'
  })

  const all = watch()

  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])

  const name = localStorage.getItem('lang') === 'en' ? 'name' : `name_${localStorage.getItem('lang')}`

  useEffect(() => {
    if ((!languages || !languages.length) && !isLoadingLanguages) {
      settingsGetLanguages()
    }

    return () => {
      reset(null)
    }
  }, [])

  useEffect(() => {
    if (languages && languages.length && language) {
      const value = languages.filter(lang => lang.code === language)
      if (value && value.length) {
        setValue('language', value[0][name])
      }
    }
  }, [languages, language])

  const handleSubmit = useCallback(() => {
    const data = { ...values }

    if (data.language) {
      const codeLanguage = languages.filter(lang => lang[name] === data.language).map(lang => lang.code)[0]
      data.language = codeLanguage || null
    }

    Object.keys(data).forEach(key => {
      if (!data[key]) {
        delete data[key]
      }
    })

    identityPutAccount({ ...data })
  }, [values])

  return (
    <Wrapper>
      <StyledForm>
        <Form.Item label={intl.get('profileUser.fields.firstName.label')}>
          <RHFInput
            as={<Input size='large' placeholder={intl.get('profileUser.fields.firstName.placeholder')} />}
            name='first_name'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.first_name}
          />
          <Error errors={errors} destination='first_name' />
        </Form.Item>
        <Form.Item label={intl.get('profileUser.fields.lastName.label')}>
          <RHFInput
            as={<Input size='large' placeholder={intl.get('profileUser.fields.lastName.placeholder')} />}
            name='last_name'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.last_name}
          />
          <Error errors={errors} destination='last_name' />
        </Form.Item>
        <Form.Item label={intl.get('profileUser.fields.jobTitle.label')}>
          <RHFInput
            as={<Input size='large' placeholder={intl.get('profileUser.fields.jobTitle.placeholder')} />}
            name='job_title'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.job_title}
          />
          <Error errors={errors} destination='name' />
        </Form.Item>
        <Form.Item label={intl.get('profileUser.fields.phone.label')}>
          <RHFInput
            as={<Input size='large' placeholder={intl.get('profileUser.fields.phone.placeholder')} />}
            name='phone'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.phone}
          />
          <Error errors={errors} destination='phone' />
        </Form.Item>
        <Form.Item label={intl.get('profileUser.fields.language.label')}>
          <RHFInput
            as={
              <Select
                showSearch
                loading={isLoadingLanguages}
                getPopupContainer={trigger => trigger.parentNode}
                size='large'
                placeholder={intl.get('profileUser.fields.language.placeholder')}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {languages && languages.length && !isLoadingLanguages
                  ? languages.map(lang => (
                      <Option style={{ fontSize: 16 }} key={lang.code} value={lang[name]}>
                        {lang[name]}
                      </Option>
                    ))
                  : null}
              </Select>
            }
            name='language'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.language}
          />
          <Error errors={errors} destination='language' />
        </Form.Item>
        <Form.Item label={intl.get('profileUser.fields.address1.label')}>
          <RHFInput
            as={<Input size='large' placeholder={intl.get('profileUser.fields.address1.placeholder')} />}
            name='address1'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.address1}
          />
          <Error errors={errors} destination='address1' />
        </Form.Item>
        <Form.Item label={intl.get('profileUser.fields.address2.label')}>
          <RHFInput
            as={<Input size='large' placeholder={intl.get('profileUser.fields.address2.placeholder')} />}
            name='address2'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.address2}
          />
          <Error errors={errors} destination='address2' />
        </Form.Item>
        <Form.Item label={intl.get('profileUser.fields.city.label')}>
          <RHFInput
            as={<Input size='large' placeholder={intl.get('profileUser.fields.city.placeholder')} />}
            name='city'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.city}
          />
          <Error errors={errors} destination='city' />
        </Form.Item>
        <Form.Item label={intl.get('profileUser.fields.postCode.label')}>
          <RHFInput
            as={<Input size='large' placeholder={intl.get('profileUser.fields.postCode.placeholder')} />}
            name='post_code'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.post_code}
          />
          <Error errors={errors} destination='post_code' />
        </Form.Item>
      </StyledForm>
      <ProfileUserSummary values={values} />
      <ButtonWrapper>
        <Button type='danger' size='large' onClick={handleSubmit}>
          {intl.get('profileUser.submitButton')}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

ProfileUser.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  identityPutAccount: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object,
  settingsGetLanguages: PropTypes.func.isRequired
}

ProfileUser.defaultProps = {
  languages: [],
  isLoadingLanguages: false,
  initialValues: null
}

export default withRouter(ProfileUser)
