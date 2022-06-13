import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { RHFInput } from 'react-hook-form-input'
import { Form, Input, Select } from 'antd'
import intl from 'react-intl-universal'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import Error from '../Error'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import WidgetRemaining from '../WidgetRemaining'
import PreviewImage from '../PreviewImage'
import { InputsWrapper, ExistedImageWrapper, PreviewImageWrapper } from './styles'

import { icons } from '../../../utils/consts'

const TEXT_LENGTH = 500

const { TextArea } = Input
const { Option } = Select
const ProductEditPopupWidget = ({
  register,
  setValue,
  clearError,
  setError,
  errors,
  data,
  sources,
  activeSource,
  widgetIndex,
  isSelectsDisable,
  postUpload,
  lastUploaded,
  postUploadClear,
  isUploading
}) => {
  const [activeOption, setActiveOption] = useState(null)

  const validationFieldValue = (field, value) => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].popup.${field}`)
    if (!value) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].popup.${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }

  useEffect(() => {
    if (!data.popup || !data.popup.title) {
      validationFieldValue('title', '')
    }
    if (!data.popup.text) {
      validationFieldValue('text', '')
    }
    if (!data.popup.ok) {
      validationFieldValue('ok', '')
    }
    if (!data.popup.cancel) {
      validationFieldValue('cancel', '')
    }
    if (!data.popup.icon) {
      validationFieldValue('icon', '')
    }

    if (data.popup.icon && !icons.find(el => el.value === data.popup.icon)) {
      setActiveOption('custom')
    }
    if (data.popup.icon && icons.find(el => el.value === data.popup.icon)) {
      setActiveOption(data.popup.icon)
    }
  }, [])

  const handleValueChange = (field, value) => {
    let newValue = value.trimLeft().replace('  ', ' ')
    if (newValue.length > TEXT_LENGTH && field === 'text') {
      newValue = newValue.substring(0, TEXT_LENGTH)
    }
    validationFieldValue(field, newValue)

    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].popup[field] = newValue
    setValue('sources', newSources)
  }

  const remainingValue = TEXT_LENGTH - (data.popup && data.popup.text && data.popup.text.length) || 0

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('widgets.popup.title')}
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
      <Form.Item label={intl.get('widgets.popup.icon')}>
        <Select
          showSearch
          style={{ width: '100%' }}
          optionFilterProp='children'
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          getPopupContainer={trigger => trigger.parentNode}
          value={
            activeOption === 'custom'
              ? intl.get('widgets.popup.options.custom')
              : (data.popup && data.popup.icon) || undefined
          }
          placeholder={intl.get('widgets.popup.placeholder')}
          onChange={value => {
            if (value === activeOption) {
              return
            }
            setActiveOption(value)
            handleValueChange('icon', value !== 'custom' ? value : '')
          }}
        >
          {icons.map(el => (
            <Option style={{ fontSize: 16 }} key={el.value} value={el.value}>
              {el.description}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {activeOption !== 'custom' ? (
        <PreviewImageWrapper>
          <ExistedImageWrapper>
            {data.popup.icon ? (
              <img
                src={
                  icons.find(el => el.value === data.popup.icon) && icons.find(el => el.value === data.popup.icon).url
                }
                alt='Preview'
              />
            ) : null}
          </ExistedImageWrapper>
          <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].popup.icon`} />
        </PreviewImageWrapper>
      ) : (
        <PreviewImage
          setValue={setValue}
          postUpload={postUpload}
          postUploadClear={postUploadClear}
          activeSource={activeSource}
          validationFieldValue={validationFieldValue}
          isSelectsDisable={isSelectsDisable}
          widgetIndex={widgetIndex}
          lastUploaded={lastUploaded}
          isUploading={isUploading}
          url={data.popup.icon}
          sources={sources}
          id={data && data.id}
          fieldForValidation='icon'
          destination={`sources[${activeSource}].data[${widgetIndex}].popup.icon`}
          errors={errors}
        />
      )}
      <Form.Item label={intl.get('widgets.popup.displayTitle')}>
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} />}
          rules={{ required: true }}
          register={register}
          setValue={setValue}
          value={data && data.popup && data.popup.title}
          onChange={e => {
            const { value } = e.target
            handleValueChange('title', value)
          }}
        />
        <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].popup.title`} />
      </Form.Item>
      <Form.Item label={intl.get('widgets.popup.text')}>
        <WidgetRemaining value={remainingValue} />
        <RHFInput
          as={<TextArea size='large' disabled={isSelectsDisable} rows={12} maxLength={TEXT_LENGTH} />}
          rules={{ required: true }}
          register={register}
          value={data && data.popup && data.popup.text}
          setValue={setValue}
          onChange={value => {
            validationFieldValue('text', value.target.value)
            handleValueChange('text', value.target.value)
          }}
        />
        <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].popup.text`} />
      </Form.Item>
      <InputsWrapper>
        <Form.Item label={intl.get('widgets.popup.ok')}>
          <RHFInput
            as={<Input size='large' disabled={isSelectsDisable} />}
            rules={{ required: true }}
            register={register}
            setValue={setValue}
            value={data && data.popup && data.popup.ok}
            onChange={e => {
              const { value } = e.target
              handleValueChange('ok', value)
            }}
          />
          <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].popup.ok`} />
        </Form.Item>
        <Form.Item label={intl.get('widgets.popup.cancel')}>
          <RHFInput
            as={<Input size='large' disabled={isSelectsDisable} />}
            rules={{ required: true }}
            register={register}
            setValue={setValue}
            value={data && data.popup && data.popup.cancel}
            onChange={e => {
              const { value } = e.target
              handleValueChange('cancel', value)
            }}
          />
          <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].popup.cancel`} />
        </Form.Item>
      </InputsWrapper>
    </ProductEditWidgetWrapper>
  )
}

ProductEditPopupWidget.propTypes = {
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
  isSelectsDisable: PropTypes.bool,
  postUpload: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  lastUploaded: PropTypes.object,
  postUploadClear: PropTypes.func.isRequired,
  isUploading: PropTypes.number
}

ProductEditPopupWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false,
  lastUploaded: null,
  isUploading: 0
}

export default ProductEditPopupWidget
