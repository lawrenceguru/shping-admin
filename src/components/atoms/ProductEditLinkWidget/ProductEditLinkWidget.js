import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import { Form, Input } from 'antd'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import 'image-manipulation'
import { StyledError } from '../ProductEditInfoWidget/styles'
import ImageDropzone from '../../molecules/DropZone'
import ExistedImageDropzone from '../../molecules/ExistedDropZone'
import IconButton from '../../molecules/IconButton'
import LoadingSpinner from '../LoadingSpinner'

const ExistedImageWrapper = styled.div`
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  min-height: 100px;
  min-width: 80%;
  cursor: pointer;
  & img {
    margin: 20px 0;
    max-height: 200px;
    max-width: 300px;
  }
`

const PreviewImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const RotateWrapper = styled.div`
  margin-bottom: 20px;
  position: absolute;
  top: -28px;
  right: -10px;
`

const ProductEditLinkWidget = ({
  setValue,
  register,
  clearError,
  setError,
  errors,
  data,
  sources,
  activeSource,
  isUploading,
  widgetIndex,
  isSelectsDisable,
  postUpload,
  lastUploaded,
  postUploadClear,
  isUploadingVideo
}) => {
  const validURL = str => {
    const pattern = new RegExp(
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
    if (!pattern.test(str)) {
      setError(`sources[${activeSource}].data[${widgetIndex}].link.url`, 'notMatch', intl.get('validation.invalidUrl'))
    }
  }

  const validationFieldValue = field => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].link.${field}`)
    if (!data.link[field]) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].link.${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
      return false
    }
    return true
  }

  useEffect(() => {
    if (!data.link || !data.link.text) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].link.text`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
    if (!data.link.url) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].link.url`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }, [])

  const handleValueChange = (field, value) => {
    const newValue = value.trimLeft().replace('  ', ' ')

    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].link[field] = value
    setValue('sources', newSources)
    validationFieldValue(field)

    if (field === 'url') {
      validURL(newValue)
    }
  }

  const onDrop = files => {
    const activeFile = files.length > 1 ? files[files.length - 1] : files[0]
    postUpload({ file: activeFile, index: widgetIndex, id: data.id })
    validationFieldValue('image')
  }

  const rotateImageBlock = url => {
    const { ImageMethods } = window

    ImageMethods.getCanvasFromUrl(`${url}?cacheblock=true`, canvas => {
      const instance = new ImageMethods(canvas)
      instance.rotate(90)
      onDrop([ImageMethods.toBlob(instance.canvas)])
    })
  }

  useEffect(() => {
    if (lastUploaded && lastUploaded.url && lastUploaded.index === widgetIndex && lastUploaded.id === data.id) {
      const newSources = [...sources]
      newSources[activeSource].data[widgetIndex].link.image = lastUploaded.url
      setValue('sources', newSources)
      validationFieldValue('image')
      postUploadClear()
    }
  }, [lastUploaded])

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('widgets.link.title')}
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
      <Form.Item label={intl.get('widgets.link.displayText')}>
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} placeholder={intl.get('widgets.link.displayText')} />}
          rules={{ required: true }}
          value={data && data.link && data.link.text}
          onChange={e => {
            const { value } = e.target
            handleValueChange('text', value)
          }}
          register={register}
          setValue={setValue}
        />
        <StyledError
          style={{
            visibility: errors[`sources[${activeSource}].data[${widgetIndex}].link.text`] ? 'visible' : 'hidden'
          }}
        >
          {errors[`sources[${activeSource}].data[${widgetIndex}].link.text`] &&
            errors[`sources[${activeSource}].data[${widgetIndex}].link.text`].message}
        </StyledError>
      </Form.Item>
      <Form.Item label={intl.get('widgets.link.url')}>
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} placeholder={intl.get('widgets.link.url')} />}
          rules={{ required: true }}
          value={data && data.link && data.link.url}
          onChange={e => {
            const { value } = e.target
            handleValueChange('url', value)
          }}
          register={register}
          setValue={setValue}
        />
        <StyledError
          style={{
            visibility: errors[`sources[${activeSource}].data[${widgetIndex}].link.url`] ? 'visible' : 'hidden'
          }}
        >
          {errors[`sources[${activeSource}].data[${widgetIndex}].link.url`] &&
            errors[`sources[${activeSource}].data[${widgetIndex}].link.url`].message}
        </StyledError>
      </Form.Item>
      <Form.Item label={intl.get('widgets.video.content')}>
        {data && data.link && data.link.image ? (
          <LoadingSpinner isLoading={isUploading === data.id && !isUploadingVideo}>
            <PreviewImageWrapper>
              <RotateWrapper>
                <IconButton
                  type='Rotate'
                  popText={intl.get('widgets.images.rotate')}
                  styleParam={{ fontSize: 19, marginRight: 10 }}
                  actionFunction={() => rotateImageBlock(data.link.image)}
                  visible={!isSelectsDisable}
                />
              </RotateWrapper>
              <ExistedImageWrapper>
                <ExistedImageDropzone
                  onDrop={files => {
                    onDrop(files)
                  }}
                  disabled={isSelectsDisable}
                >
                  <img src={data.link.image} alt='Preview' />
                </ExistedImageDropzone>
              </ExistedImageWrapper>
            </PreviewImageWrapper>
          </LoadingSpinner>
        ) : (
          <ImageDropzone
            onDrop={files => {
              onDrop(files)
            }}
            disabled={isSelectsDisable}
          />
        )}
      </Form.Item>
    </ProductEditWidgetWrapper>
  )
}

ProductEditLinkWidget.propTypes = {
  setValue: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  errors: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  postUpload: PropTypes.func.isRequired,
  isUploading: PropTypes.number,
  widgetIndex: PropTypes.number.isRequired,
  sources: PropTypes.arrayOf(PropTypes.object),
  isSelectsDisable: PropTypes.bool
}

ProductEditLinkWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false,
  isUploading: null
}

export default ProductEditLinkWidget
