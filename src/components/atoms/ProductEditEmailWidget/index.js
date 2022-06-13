import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { RHFInput } from 'react-hook-form-input'
import { Form, Input } from 'antd'
import intl from 'react-intl-universal'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import Error from '../Error'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import WidgetRemaining from '../WidgetRemaining'

const { TextArea } = Input

const EMAIL_SUBJECT_LENGTH = 200
const EMAIL_TEXT_LENGTH = 500

const ProductEditEmailWidget = ({
  register,
  setValue,
  clearError,
  setError,
  errors,
  data,
  sources,
  activeSource,
  widgetIndex,
  isSelectsDisable
}) => {
  const validationFieldValue = (field, value) => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].email.${field}`)
    if (!value) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].email.${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }

  const setErrorMessage = field => {
    setError(
      `sources[${activeSource}].data[${widgetIndex}].email.${field}`,
      'notMatch',
      intl.get('validation.requiredField')
    )
  }

  useEffect(() => {
    if (!data.email || !data.email.subject) {
      setErrorMessage('subject')
    }
    if (!data.email || !data.email.to) {
      setErrorMessage('to')
    }
    if (!data.email || !data.email.text) {
      setErrorMessage('text')
    }
  }, [])

  const handleValueChange = (field, value) => {
    validationFieldValue(field, value.trim())
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].email[field] = value
    setValue('sources', newSources)
  }

  const remainingValueSubject = () => {
    return EMAIL_SUBJECT_LENGTH - (data.email && data.email.subject && data.email.subject.length) || 0
  }

  const remainingValueText = () => {
    return EMAIL_TEXT_LENGTH - (data.email && data.email.text && data.email.text.length) || 0
  }

  const validateEmail = value => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].email.to`)
    // eslint-disable-next-line no-useless-escape,max-len
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(value).toLowerCase())) {
      setError(`sources[${activeSource}].data[${widgetIndex}].email.to`, 'notMatch', intl.get('validation.email'))
    }
  }

  return (
    <ProductEditWidgetWrapper
      headerText='Email'
      id={data.id}
      HeaderPanel={() => (
        <WidgetHeaderSwitchMode
          setValue={setValue}
          data={data}
          sources={sources}
          activeSource={activeSource}
          widgetIndex={widgetIndex}
          isSelectsDisable={isSelectsDisable}
        />
      )}
    >
      <Form.Item label='Recipient'>
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} placeholder='Recipient' />}
          rules={{ required: true }}
          register={register}
          setValue={setValue}
          value={data && data.email && data.email.to}
          onChange={e => {
            const { value } = e.target
            handleValueChange('to', value)
            validateEmail(value)
          }}
        />
        <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].email.to`} />
      </Form.Item>
      <Form.Item label='Subject'>
        <WidgetRemaining value={remainingValueSubject()} />
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} placeholder='Subject' />}
          rules={{ required: true }}
          register={register}
          setValue={setValue}
          value={data && data.email && data.email.subject}
          onChange={e => {
            const { value } = e.target
            if (value.length > EMAIL_SUBJECT_LENGTH) {
              return
            }
            handleValueChange('subject', value)
          }}
        />
        <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].email.subject`} />
      </Form.Item>
      <Form.Item label='Text that will be shown'>
        <WidgetRemaining value={remainingValueText()} />
        <RHFInput
          as={<TextArea rows={4} disabled={isSelectsDisable} placeholder='Text that will be shown' />}
          rules={{ required: true }}
          register={register}
          setValue={setValue}
          value={data && data.email && data.email.text}
          onChange={e => {
            const { value } = e.target
            if (value.length > EMAIL_TEXT_LENGTH) {
              return
            }
            handleValueChange('text', value)
          }}
        />
        <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].email.text`} />
      </Form.Item>
    </ProductEditWidgetWrapper>
  )
}

ProductEditEmailWidget.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  activeSource: PropTypes.number.isRequired,
  widgetIndex: PropTypes.number.isRequired,
  sources: PropTypes.arrayOf(PropTypes.object),
  isSelectsDisable: PropTypes.bool
}

ProductEditEmailWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false
}

export default ProductEditEmailWidget
