import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import { Button, Form, Input } from 'antd'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import 'image-manipulation'
import Error from '../Error'
import * as ST from './styles'
import ImageDropzone from '../../molecules/DropZone'
import ExistedImageDropzone from '../../molecules/ExistedDropZone'
import IconButton from '../../molecules/IconButton'
import LoadingSpinner from '../LoadingSpinner'

const CampaignBotMediaContent = ({
  setValue,
  register,
  errors,
  isUploading,
  index,
  id,
  postUpload,
  lastUploaded,
  postUploadClear,
  isUploadingVideo,
  handleDelete,
  setError,
  clearError,
  values
}) => {
  const videoRef = useRef(null)
  const onDrop = (files, type) => {
    const activeFile = files.length > 1 ? files[files.length - 1] : files[0]
    postUpload({ file: activeFile, index, id, type: type || activeFile.type })
  }

  const rotateImageBlock = (url, type) => {
    const { ImageMethods } = window

    ImageMethods.getCanvasFromUrl(`${url}?cacheblock=true`, canvas => {
      const instance = new ImageMethods(canvas)
      instance.rotate(90)
      onDrop([ImageMethods.toBlob(instance.canvas)], type)
    })
  }

  useEffect(() => {
    if (
      values &&
      values.mediaScans &&
      values.mediaScans[index] &&
      values.mediaScans[index].type &&
      values.mediaScans[index].type.includes('video') &&
      !values.mediaScans[index].preview
    ) {
      setError(`mediaScans[${index}].preview`, 'Required', intl.get('todo.cards.form.required'))
    } else if (errors && errors[`mediaScans[${index}].preview`]) {
      clearError(`mediaScans[${index}].preview`)
    }

    if (values && values.mediaScans && values.mediaScans[index] && !values.mediaScans[index].url) {
      setError(`mediaScans[${index}].url`, 'Required', intl.get('todo.cards.form.required'))
    } else if (errors && errors[`mediaScans[${index}].url`]) {
      clearError(`mediaScans[${index}].url`)
    }
  }, [values])

  useEffect(() => {
    if (lastUploaded && lastUploaded.url && lastUploaded.index === index && lastUploaded.id === id) {
      if (lastUploaded.type === 'preview') {
        register({ name: `mediaScans[${index}].preview` }, { required: intl.get('todo.cards.form.required') })
        setValue(`mediaScans[${index}].preview`, lastUploaded.url)
      } else {
        register({ name: `mediaScans[${index}].url` })
        register({ name: `mediaScans[${index}].type` })

        setValue(`mediaScans[${index}].url`, lastUploaded.url)
        setValue(`mediaScans[${index}].type`, lastUploaded.type)

        if (lastUploaded.type && lastUploaded.type.includes('video')) {
          setValue(`mediaScans[${index}].preview`, undefined)
        }
      }

      postUploadClear()
    }
  }, [lastUploaded])

  const setPreview = useCallback(() => {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

    if (canvas.toBlob) {
      canvas.toBlob(preview => {
        postUpload({ file: preview, index, id, type: 'preview' })
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

      postUpload({ file: blobImage, index, id, type: 'preview' })
    }
  }, [index, videoRef, id])

  const renderExistedDropZone = useCallback(
    content => {
      return content.type && content.type.includes('image') ? (
        <LoadingSpinner isLoading={isUploading === id && !isUploadingVideo}>
          <ST.PreviewImageWrapper>
            <ST.RotateWrapper>
              <IconButton
                type='Rotate'
                popText={intl.get('widgets.images.rotate')}
                styleParam={{ fontSize: 19, marginRight: 10 }}
                actionFunction={() => rotateImageBlock(content.url)}
              />
            </ST.RotateWrapper>
            <ST.ExistedImageWrapper>
              <ExistedImageDropzone
                format='video/mp4,video/x-m4v,video/*, image/*'
                onDrop={files => {
                  onDrop(files)
                }}
              >
                <img src={content.url} alt='Preview' />
              </ExistedImageDropzone>
            </ST.ExistedImageWrapper>
          </ST.PreviewImageWrapper>
        </LoadingSpinner>
      ) : (
        <>
          <ST.ButtonWrapper>
            <Button onClick={setPreview}>{intl.get('widgets.video.buttonText')}</Button>
            <ExistedImageDropzone
              format='video/mp4,video/x-m4v,video/, image/*'
              onDrop={files => {
                onDrop(files)
              }}
            >
              <IconButton
                type='Download'
                popText={intl.get('widgets.video.downloadPopup')}
                styleParam={{ fontSize: 22, marginLeft: 10 }}
              />
            </ExistedImageDropzone>
          </ST.ButtonWrapper>
          <LoadingSpinner isLoading={isUploading === id && isUploadingVideo}>
            <ST.ExistedVideoWrapper>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video ref={videoRef} controls src={content.url} id='video' crossOrigin='Anonymous' />
            </ST.ExistedVideoWrapper>
          </LoadingSpinner>
          <ST.PreviewBlockWrapper>
            <Form.Item label={intl.get('widgets.video.preview')}>
              <LoadingSpinner isLoading={isUploading === id && !isUploadingVideo}>
                <ST.PreviewImageWrapper>
                  {content.preview ? (
                    <>
                      <ST.RotateWrapper>
                        <IconButton
                          type='Rotate'
                          popText={intl.get('widgets.images.rotate')}
                          styleParam={{ fontSize: 19, marginRight: 10 }}
                          actionFunction={() => rotateImageBlock(content.preview, 'preview')}
                        />
                      </ST.RotateWrapper>
                      <ST.ExistedImageWrapper>
                        <ExistedImageDropzone
                          onDrop={files => {
                            onDrop(files, 'preview')
                          }}
                        >
                          <img src={content.preview} alt='Preview' />
                        </ExistedImageDropzone>
                      </ST.ExistedImageWrapper>
                    </>
                  ) : (
                    <ImageDropzone
                      onDrop={files => {
                        onDrop(files, 'preview')
                      }}
                    />
                  )}
                </ST.PreviewImageWrapper>
              </LoadingSpinner>
            </Form.Item>
            <Error errors={errors} destination={`mediaScans[${index}].preview`} />
          </ST.PreviewBlockWrapper>
        </>
      )
    },
    [id, index, errors, isUploading, isUploadingVideo]
  )

  return (
    <ProductEditWidgetWrapper
      handleDelete={handleDelete}
      isHaveDeleteIcon
      index={index}
      headerText={intl.get('campaigns.bot.form.scanValue', { value: index + 1 })}
      id={id}
    >
      <Form.Item label={intl.get('campaigns.bot.form.mediaTitle')}>
        <RHFInput
          as={<Input size='large' placeholder={intl.get('campaigns.bot.form.mediaTitleTitle')} />}
          name={`mediaScans[${index}].title`}
          rules={{ required: intl.get('todo.cards.form.required') }}
          register={register}
          setValue={setValue}
          defaultValue={values && values.mediaScans && values.mediaScans[index] && values.mediaScans[index].title}
          mode='onChange'
        />
        <Error errors={errors} destination={`mediaScans[${index}].title`} />
      </Form.Item>
      <Form.Item label={intl.get('widgets.video.content')}>
        {values && values.mediaScans && values.mediaScans[index] && values.mediaScans[index].url ? (
          renderExistedDropZone(values.mediaScans[index])
        ) : (
          <>
            <ImageDropzone
              format='video/mp4,video/x-m4v,video/, image/*'
              onDrop={files => {
                onDrop(files)
              }}
            />
            <Error errors={errors} destination={`mediaScans[${index}].url`} />
          </>
        )}
      </Form.Item>
    </ProductEditWidgetWrapper>
  )
}

CampaignBotMediaContent.propTypes = {
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  errors: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  postUpload: PropTypes.func.isRequired,
  isUploading: PropTypes.string,
  register: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  lastUploaded: PropTypes.object,
  postUploadClear: PropTypes.func.isRequired,
  isUploadingVideo: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  handleDelete: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
}

CampaignBotMediaContent.defaultProps = {
  errors: {},
  isUploading: null,
  lastUploaded: null,
  isUploadingVideo: false,
  values: null
}

export default CampaignBotMediaContent
