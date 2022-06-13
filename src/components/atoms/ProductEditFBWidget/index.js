import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RHFInput } from 'react-hook-form-input'
import { Form, Input } from 'antd'
import intl from 'react-intl-universal'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import Error from '../Error'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import WidgetRemaining from '../WidgetRemaining'

const StyledUrl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`
const FB_TEXT_LENGTH = 100
const FB_LINK = 'https://www.facebook.com/'

const ProductEditTextWidget = ({
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
    clearError(`sources[${activeSource}].data[${widgetIndex}].follow_fb.${field}`)
    if (!value) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].follow_fb.${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }

  const modifyUrlField = () => {
    if (!data.follow_fb || !data.follow_fb.text) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].follow_fb.text`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }

    if (!data.follow_fb.url) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].follow_fb.url`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }

  useEffect(() => {
    modifyUrlField()
  }, [])

  useEffect(() => {
    modifyUrlField()
  }, [data])

  const validationFBLink = value => {
    if (!value.startsWith(FB_LINK)) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].follow_fb.url`,
        'notMatch',
        intl.get('validation.shouldStartWith', { text: FB_LINK })
      )
    }
  }

  const handleValueChange = (field, value) => {
    let newValue = value.trimLeft().replace('  ', ' ')
    if (newValue.length > FB_TEXT_LENGTH && field === 'text') {
      newValue = newValue.substring(0, FB_TEXT_LENGTH)
    }
    validationFieldValue(field, newValue)

    if (field === 'url') {
      validationFBLink(newValue)
    }

    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].follow_fb[field] = newValue
    setValue('sources', newSources)
  }

  const remainingValue = FB_TEXT_LENGTH - (data.follow_fb && data.follow_fb.text && data.follow_fb.text.length) || 0

  return (
    <ProductEditWidgetWrapper
      headerText='Follow Facebook'
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
      <Form.Item label='Display text'>
        <WidgetRemaining value={remainingValue} />
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} />}
          rules={{ required: true }}
          register={register}
          setValue={setValue}
          value={data && data.follow_fb && data.follow_fb.text}
          onChange={e => {
            const { value } = e.target
            handleValueChange('text', value)
          }}
        />
        <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].follow_fb.text`} />
      </Form.Item>
      <Form.Item label='Url'>
        <StyledUrl>
          <RHFInput
            as={<Input size='large' disabled={isSelectsDisable} />}
            rules={{ required: true }}
            register={register}
            setValue={setValue}
            value={data && data.follow_fb && data.follow_fb.url}
            onChange={e => {
              const { value } = e.target
              handleValueChange('url', value)
            }}
          />
        </StyledUrl>
        <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].follow_fb.url`} />
      </Form.Item>
    </ProductEditWidgetWrapper>
  )
}

ProductEditTextWidget.propTypes = {
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

ProductEditTextWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false
}

export default ProductEditTextWidget
