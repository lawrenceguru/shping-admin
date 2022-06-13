import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RHFInput } from 'react-hook-form-input'
import { Form, Input, Select } from 'antd'
import uuid from 'uuid4'
import { isNil } from 'lodash'
import intl from 'react-intl-universal'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import CustomButton from '../../molecules/Button'
import PreviewImage from '../PreviewImage'
import Error from '../Error'
import IconButton from '../../molecules/IconButton'

const ICONS = [
  { label: 'Facebook', value: 'fb' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Custom Icon', value: '' }
]

const DEFAULT_ICONS_VALUES = ['fb', 'instagram', 'youtube']

const DeleteIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const SelectorWrapper = styled.div`
  margin-bottom: 20px;
`

const SocialNetworkWrapper = styled.div`
  box-shadow: inset 0 0 0 1px #fafafa, 3px 3px 4px 0px #e8e8e8;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`

const FB_LINK = 'https://www.facebook.com/'
const INSTAGRAM_LINK = 'https://www.instagram.com/'
const YOUTUBE_LINK = 'https://www.youtube.com/'
const CUSTOM_LINK_HTTP = 'http://'
const CUSTOM_LINK_HTTPS = 'https://'

const { Option } = Select
const ProductEditSocialNetworksWidget = ({
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

  const clearSocialNetworkError = index => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].icon`)
    clearError(`sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].url`)
  }

  const clearSocialNetworkErrors = () => {
    if (data && data.social_networks && data.social_networks.length) {
      data.social_networks.forEach((el, index) => {
        clearError(`sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].icon`)
        clearError(`sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].url`)
      })
    }
  }

  const validationFieldValue = (field, value, index) => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].${field}`)
    if (!value) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }

  useEffect(() => {
    if (data && data.social_networks && data.social_networks.length) {
      data.social_networks.forEach((el, index) => {
        validationFieldValue('icon', el.icon, index)
        validationFieldValue('url', el.url, index)
      })
    }

    return () => {
      clearSocialNetworkErrors()
    }
  }, [])

  const addSocialNetworkBlock = () => {
    const newSources = [...sources]
    const newSocialNetworkBlocks = [...newSources[activeSource].data[widgetIndex].social_networks]
    newSocialNetworkBlocks.push({ icon: undefined, url: null, id: uuid() })
    newSources[activeSource].data[widgetIndex].social_networks = newSocialNetworkBlocks
    validationFieldValue('url', '', newSocialNetworkBlocks.length - 1)
    validationFieldValue('icon', '', newSocialNetworkBlocks.length - 1)
    setValue('sources', newSources)
  }

  const deleteSocialNetworkBlock = index => {
    const newSources = [...sources]
    const newSocialNetworkBlocks = [...newSources[activeSource].data[widgetIndex].social_networks]
    newSocialNetworkBlocks.splice(index, 1)
    clearError(`sources[${activeSource}].data[${widgetIndex}].certificates.list[${index}].img_url`)
    newSources[activeSource].data[widgetIndex].social_networks = newSocialNetworkBlocks

    if (!newSocialNetworkBlocks.length) {
      newSources[activeSource].data[widgetIndex].social_networks.push({ icon: undefined, url: null, id: uuid() })
      validationFieldValue('url', '', newSocialNetworkBlocks.length - 1)
      validationFieldValue('icon', '', newSocialNetworkBlocks.length - 1)
    }

    clearSocialNetworkError(index)
  }

  const isCustomIcon = value => {
    return !isNil(value) && !DEFAULT_ICONS_VALUES.includes(value)
  }

  const validateUrlField = index => {
    const currNetwork = sources[activeSource].data[widgetIndex].social_networks[index]
    const currIcon = currNetwork.icon
    const currUrl = currNetwork.url

    if (currIcon === 'fb' && currUrl && !currUrl.startsWith(FB_LINK)) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].url`,
        'notMatch',
        intl.get('validation.shouldStartWith', { text: FB_LINK })
      )
      return
    }

    if (currIcon === 'instagram' && currUrl && !currUrl.startsWith(INSTAGRAM_LINK)) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].url`,
        'notMatch',
        intl.get('validation.shouldStartWith', { text: INSTAGRAM_LINK })
      )
      return
    }

    if (currIcon === 'youtube' && currUrl && !currUrl.startsWith(YOUTUBE_LINK)) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].url`,
        'notMatch',
        intl.get('validation.shouldStartWith', { text: YOUTUBE_LINK })
      )
      return
    }

    if (
      isCustomIcon(currIcon) &&
      currUrl &&
      !currUrl.startsWith(CUSTOM_LINK_HTTP) &&
      !currUrl.startsWith(CUSTOM_LINK_HTTPS)
    ) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].url`,
        'notMatch',
        intl.get('validation.shouldStartWith', {
          text: `${CUSTOM_LINK_HTTP} or ${CUSTOM_LINK_HTTPS}`
        })
      )
    }
  }

  const handleValueChange = (field, value, index) => {
    const newValue = value.trimLeft().replace('  ', ' ')
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].social_networks[index][field] = newValue
    setValue('sources', newSources)

    validationFieldValue(field, newValue, index)
    if (value) {
      validateUrlField(index)
    }
  }

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('widgets.socialNetworks.title')}
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
      {data &&
        data.social_networks &&
        !!data.social_networks.length &&
        data.social_networks.map((el, index) => {
          const isCustom = isCustomIcon(el.icon)
          return (
            // eslint-disable-next-line react/no-array-index-key
            <SocialNetworkWrapper key={index}>
              <DeleteIconWrapper>
                <IconButton
                  type='Delete'
                  popText={intl.get('widgets.socialNetworks.delete')}
                  visible={!isSelectsDisable}
                  actionFunction={() => deleteSocialNetworkBlock(index)}
                />
              </DeleteIconWrapper>
              <Form.Item label={intl.get('widgets.socialNetworks.icon')}>
                <SelectorWrapper>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    getPopupContainer={trigger => trigger.parentNode}
                    value={isCustom ? '' : el.icon}
                    placeholder={intl.get('widgets.popup.placeholder')}
                    onChange={value => {
                      if (value === activeOption) {
                        return
                      }
                      setActiveOption(value)
                      handleValueChange('icon', value, index)
                    }}
                  >
                    {ICONS.map(elem => (
                      <Option style={{ fontSize: 16 }} key={elem.value} value={elem.value}>
                        {elem.label}
                      </Option>
                    ))}
                  </Select>
                </SelectorWrapper>
                {isCustom && (
                  <PreviewImage
                    sources={sources}
                    setValue={setValue}
                    postUpload={postUpload}
                    postUploadClear={postUploadClear}
                    activeSource={activeSource}
                    validationFieldValue={validationFieldValue}
                    isSelectsDisable={isSelectsDisable}
                    widgetIndex={widgetIndex}
                    blockIndex={index}
                    lastUploaded={lastUploaded}
                    isUploading={isUploading}
                    styles={{ marginBottom: 0 }}
                    url={isCustom ? el.icon : null}
                    id={el.id}
                    fieldForValidation='icon'
                    destination={`sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].icon`}
                  />
                )}
                <Error
                  errors={errors}
                  destination={`sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].icon`}
                />
              </Form.Item>
              <Form.Item label={intl.get('widgets.socialNetworks.url')}>
                <RHFInput
                  as={
                    <Input
                      size='large'
                      disabled={isSelectsDisable}
                      placeholder={intl.get('widgets.socialNetworks.url')}
                    />
                  }
                  rules={{ required: true }}
                  value={data && data.social_networks && data.social_networks[index].url}
                  onChange={e => {
                    const { value } = e.target
                    handleValueChange('url', value, index)
                  }}
                  register={register}
                  setValue={setValue}
                />
                <Error
                  errors={errors}
                  destination={`sources[${activeSource}].data[${widgetIndex}].social_networks[${index}].url`}
                />
              </Form.Item>
            </SocialNetworkWrapper>
          )
        })}
      <CustomButton
        text={intl.get('widgets.socialNetworks.addMore')}
        width='110px'
        handleClick={addSocialNetworkBlock}
      />
    </ProductEditWidgetWrapper>
  )
}

ProductEditSocialNetworksWidget.propTypes = {
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

ProductEditSocialNetworksWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false,
  isUploading: 0,
  lastUploaded: null
}

export default ProductEditSocialNetworksWidget
