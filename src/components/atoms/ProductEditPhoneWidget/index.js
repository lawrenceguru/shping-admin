import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { RHFInput } from 'react-hook-form-input'
import { Form, Input } from 'antd'
import intl from 'react-intl-universal'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import Error from '../Error'
import WidgetRemaining from '../WidgetRemaining'

const ProductEditPhoneWidget = ({
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
    clearError(`sources[${activeSource}].data[${widgetIndex}].phone.${field}`)
    if (!value) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].phone.${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
      return false
    }
    return true
  }

  useEffect(() => {
    if (!data.phone || !data.phone.text) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].phone.text`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
    if (!data.phone || !data.phone.to || data.phone.to === '+') {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].phone.to`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }, [])

  const handleValueChange = (field, value) => {
    validationFieldValue(field, value.trim())
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].phone[field] = value
    setValue('sources', newSources)
  }

  const remainingValue = () => {
    return 200 - (data.phone && data.phone.text && data.phone.text.length) || 0
  }

  return (
    <ProductEditWidgetWrapper
      headerText='Phone'
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
      <Form.Item label='Message'>
        <WidgetRemaining value={remainingValue()} />
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} placeholder='Message' />}
          rules={{ required: true }}
          register={register}
          setValue={setValue}
          value={data && data.phone && data.phone.text}
          onChange={e => {
            const { value } = e.target
            handleValueChange('text', value)
          }}
        />
        <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].phone.text`} />
      </Form.Item>
      <Form.Item label='Phone number'>
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} placeholder='Phone number' />}
          rules={{ required: true }}
          register={register}
          setValue={setValue}
          value={data && data.phone && data.phone.to}
          onChange={e => {
            const { value } = e.target
            if (!value || value === '+' || value.charAt(0) !== '+') {
              const newSources = [...sources]
              newSources[activeSource].data[widgetIndex].phone.to = '+'
              setValue('sources', newSources)
              setError(
                `sources[${activeSource}].data[${widgetIndex}].phone.to`,
                'notMatch',
                intl.get('validation.requiredField')
              )
              return
            }
            handleValueChange('to', value)
          }}
        />
        <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].phone.to`} />
      </Form.Item>
    </ProductEditWidgetWrapper>
  )
}

ProductEditPhoneWidget.propTypes = {
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

ProductEditPhoneWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false
}

export default ProductEditPhoneWidget
