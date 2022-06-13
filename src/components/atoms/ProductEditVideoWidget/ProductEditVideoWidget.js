import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import { Button, Form, Input } from 'antd'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import 'image-manipulation'
import { StyledError } from '../ProductEditInfoWidget/styles'
import ImageDropzone from '../../molecules/DropZone'
import ExistedImageDropzone from '../../molecules/ExistedDropZone'
import IconButton from '../../molecules/IconButton'
import LoadingSpinner from '../LoadingSpinner'
import * as ST from './styles'

const ProductEditVideoWidget = ({
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
  const validationFieldValue = field => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].video.${field}`)
    if (!data.video[field]) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].video.${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
      return false
    }
    return true
  }

  const videoRef = useRef(null)

  useEffect(() => {
    if (!data.video || !data.video.title) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].video.title`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
    if (!data.video.url) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].video.url`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
    if (data.video.url && !data.video.preview) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].video.preview`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }, [])

  const handleValueChange = (field, value) => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].video[field] = value
    setValue('sources', newSources)
    validationFieldValue(field)
  }

  const onDrop = (files, type) => {
    const activeFile = files.length > 1 ? files[files.length - 1] : files[0]
    const isVideo = activeFile.type && activeFile.type.includes('video')
    postUpload({ file: activeFile, index: widgetIndex, isVideo: isVideo && type === 'video', id: widgetIndex })
    if (isVideo) {
      handleValueChange('preview', '')
    }
    validationFieldValue(type === 'video' ? 'url' : 'preview')
  }

  const rotateImageBlock = (url, action) => {
    const { ImageMethods } = window

    ImageMethods.getCanvasFromUrl(`${url}?cacheblock=true`, canvas => {
      const instance = new ImageMethods(canvas)
      if (action === 'rotateRight') {
        instance.rotate(90)
      } else {
        instance.rotate(-90)
      }
      onDrop([ImageMethods.toBlob(instance.canvas)], 'preview')
    })
  }

  const setPreview = () => {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

    if (canvas.toBlob) {
      canvas.toBlob(preview => {
        postUpload({ file: preview, index: widgetIndex, id: widgetIndex })
      })
    } else {
      let blobImage

      if (canvas.msToBlob) {
        blobImage = canvas.msToBlob()
      } else {
        const type = 'image/png'
        const quality = 1
        const binStr = atob(canvas.toDataURL(type, quality).split(',')[1])
        const len = binStr.length
        const arr = new Uint8Array(len)

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i)
        }

        blobImage = new Blob([arr], { type })
      }

      postUpload({ file: blobImage, index: widgetIndex, id: widgetIndex })
    }
  }

  useEffect(() => {
    if (lastUploaded && lastUploaded.url && lastUploaded.index === widgetIndex) {
      const newSources = [...sources]
      newSources[activeSource].data[widgetIndex].video[lastUploaded.isVideo ? 'url' : 'preview'] = lastUploaded.url
      setValue('sources', newSources)
      validationFieldValue(lastUploaded.isVideo ? 'url' : 'preview')
      postUploadClear()
    }
  }, [lastUploaded])

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('widgets.video.title')}
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
      <Form.Item label={intl.get('widgets.video.inputField')}>
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} />}
          rules={{ required: true }}
          value={data && data.video && data.video.title}
          onChange={e => {
            const { value } = e.target
            handleValueChange('title', value)
          }}
          register={register}
          setValue={setValue}
        />
        <StyledError
          style={{
            visibility: errors[`sources[${activeSource}].data[${widgetIndex}].video.title`] ? 'visible' : 'hidden'
          }}
        >
          {errors[`sources[${activeSource}].data[${widgetIndex}].video.title`] &&
            errors[`sources[${activeSource}].data[${widgetIndex}].video.title`].message}
        </StyledError>
      </Form.Item>
      {data && data.video && data.video && data.video.url ? (
        <Form.Item label={intl.get('widgets.video.content')}>
          <ST.ButtonWrapper>
            <Button disabled={isSelectsDisable} onClick={setPreview}>
              {intl.get('widgets.video.buttonText')}
            </Button>
            <ExistedImageDropzone
              onDrop={files => {
                onDrop(files, 'video')
              }}
              video
              disabled={isSelectsDisable}
            >
              <IconButton
                type='Download'
                popText={intl.get('widgets.video.downloadPopup')}
                styleParam={{ fontSize: 22, marginLeft: 10 }}
                visible={!isSelectsDisable}
              />
            </ExistedImageDropzone>
          </ST.ButtonWrapper>
          <LoadingSpinner isLoading={isUploading === widgetIndex && isUploadingVideo}>
            <ST.ExistedVideoWrapper>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video ref={videoRef} controls src={data.video.url} id='video' crossOrigin='Anonymous' />
            </ST.ExistedVideoWrapper>
          </LoadingSpinner>
          <ST.PreviewBlockWrapper>
            <Form.Item label={intl.get('widgets.video.preview')}>
              <LoadingSpinner isLoading={isUploading === widgetIndex && !isUploadingVideo}>
                <ST.PreviewImageWrapper>
                  {data.video.preview ? (
                    <>
                      <ST.RotateWrapper>
                        <IconButton
                          type='RotateLeft'
                          popText={intl.get('widgets.images.rotate')}
                          styleParam={{ fontSize: 19, marginRight: 10 }}
                          actionFunction={() => rotateImageBlock(data.video.preview, 'rotateLeft')}
                          visible={!isSelectsDisable}
                        />
                        <IconButton
                          type='Rotate'
                          popText={intl.get('widgets.images.rotate')}
                          styleParam={{ fontSize: 19, marginRight: 10 }}
                          actionFunction={() => rotateImageBlock(data.video.preview, 'rotateRight')}
                          visible={!isSelectsDisable}
                        />
                      </ST.RotateWrapper>
                      <ST.ExistedImageWrapper>
                        <ExistedImageDropzone
                          onDrop={files => {
                            onDrop(files, 'preview')
                          }}
                          disabled={isSelectsDisable}
                        >
                          <img src={data.video.preview} alt='Preview' />
                        </ExistedImageDropzone>
                      </ST.ExistedImageWrapper>
                    </>
                  ) : (
                    <ImageDropzone
                      onDrop={files => {
                        onDrop(files, 'preview')
                      }}
                      disabled={isSelectsDisable}
                    />
                  )}
                </ST.PreviewImageWrapper>
              </LoadingSpinner>
            </Form.Item>
            <StyledError
              style={{
                visibility: errors[`sources[${activeSource}].data[${widgetIndex}].video.preview`] ? 'visible' : 'hidden'
              }}
            >
              {errors[`sources[${activeSource}].data[${widgetIndex}].video.preview`] &&
                errors[`sources[${activeSource}].data[${widgetIndex}].video.preview`].message}
            </StyledError>
          </ST.PreviewBlockWrapper>
        </Form.Item>
      ) : (
        <ImageDropzone
          onDrop={files => {
            onDrop(files, 'video')
          }}
          video
          disabled={isSelectsDisable}
        />
      )}
      <StyledError
        style={{
          visibility: errors[`sources[${activeSource}].data[${widgetIndex}].video.url`] ? 'visible' : 'hidden'
        }}
      >
        {errors[`sources[${activeSource}].data[${widgetIndex}].video.url`] &&
          errors[`sources[${activeSource}].data[${widgetIndex}].video.url`].message}
      </StyledError>
    </ProductEditWidgetWrapper>
  )
}

ProductEditVideoWidget.propTypes = {
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

ProductEditVideoWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false,
  isUploading: null
}

export default ProductEditVideoWidget
