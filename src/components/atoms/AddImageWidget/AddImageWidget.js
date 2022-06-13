import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Form } from 'antd'
import uuid from 'uuid4'
import LoadingSpinner from '../LoadingSpinner'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import IconButton from '../../molecules/IconButton'
import Error from '../Error'
import ImageDropzone from '../../molecules/DropZone'
import ExistedImageDropzone from '../../molecules/ExistedDropZone'
import { Wrapper, ExistedImageWrapper, StyledText, ErrorWrapper, ImageBlockWrapper } from './styles'
import 'image-manipulation'

const AddImageWidget = ({
  setValue,
  clearError,
  register,
  setError,
  errors,
  values,
  postUpload,
  isUploading,
  lastUploaded,
  postUploadClear,
  activeIndex,
  name,
  headerText
}) => {
  const imageId = useMemo(() => {
    return uuid()
  }, [])
  const [isRotatingImage, setIsRotatingImage] = useState(false)
  const validationFieldValue = () => {
    clearError(name)
    if ((!values || !values[name]) && !isUploading) {
      setError(name, 'notMatch', intl.get('validation.requiredField'))
    }
  }

  useEffect(() => {
    validationFieldValue()
    postUploadClear()
    register({ name }, { required: intl.get('validation.requiredField') })
  }, [])

  useEffect(() => {
    validationFieldValue()
  }, [isUploading])

  const onDrop = (files, index, id) => {
    postUpload({ file: files[0], index, id })
  }

  const rotateImageBlock = (url, index, action, id) => {
    setIsRotatingImage(true)
    const { ImageMethods } = window

    ImageMethods.getCanvasFromUrl(`${url}?cacheblock=true`, canvas => {
      const instance = new ImageMethods(canvas)
      if (action === 'rotateRight') {
        instance.rotate(90)
      } else {
        instance.rotate(-90)
      }
      onDrop([ImageMethods.toBlob(instance.canvas)], index, id)
      setIsRotatingImage(false)
    })
  }

  useEffect(() => {
    if (lastUploaded && lastUploaded.url && lastUploaded.id === imageId) {
      setValue(name, lastUploaded.url)
      clearError(name)
      postUploadClear()
    }
  }, [lastUploaded])

  return (
    <ProductEditWidgetWrapper headerText={headerText || intl.get('widgets.images.title')} id={imageId}>
      <Wrapper>
        <Form.Item label={intl.get('widgets.images.content')}>
          <StyledText>
            {values && values[name] && (
              <>
                <IconButton
                  type='RotateLeft'
                  popText={intl.get('widgets.images.rotate')}
                  styleParam={{ fontSize: 19, marginRight: 10 }}
                  actionFunction={() => rotateImageBlock(values[name], 0, 'rotateLeft', imageId)}
                />
                <IconButton
                  type='Rotate'
                  popText={intl.get('widgets.images.rotate')}
                  styleParam={{ fontSize: 19, marginRight: 10 }}
                  actionFunction={() => rotateImageBlock(values[name], 0, 'rotateRight', imageId)}
                />
              </>
            )}
          </StyledText>
          <LoadingSpinner isLoading={(isUploading === imageId && activeIndex === 0) || isRotatingImage}>
            <ImageBlockWrapper>
              {!values || !values[name] ? (
                <ImageDropzone
                  onDrop={files => {
                    onDrop(files, 0, imageId)
                  }}
                />
              ) : (
                <ExistedImageWrapper>
                  <ExistedImageDropzone
                    onDrop={files => {
                      onDrop(files, 0, imageId)
                    }}
                  >
                    <img src={values && values[name]} alt='Preview' />
                  </ExistedImageDropzone>
                </ExistedImageWrapper>
              )}
            </ImageBlockWrapper>
          </LoadingSpinner>
        </Form.Item>
        <ErrorWrapper>
          <Error errors={errors} destination={name} />
        </ErrorWrapper>
      </Wrapper>
    </ProductEditWidgetWrapper>
  )
}

AddImageWidget.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  postUpload: PropTypes.func.isRequired,
  isUploading: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  lastUploaded: PropTypes.object,
  postUploadClear: PropTypes.func.isRequired,
  activeIndex: PropTypes.number,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  headerText: PropTypes.string
}

AddImageWidget.defaultProps = {
  errors: {},
  isUploading: '0',
  lastUploaded: null,
  activeIndex: null,
  values: null,
  headerText: null
}

export default AddImageWidget
