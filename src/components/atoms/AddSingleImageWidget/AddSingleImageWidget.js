import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import intl from 'react-intl-universal'
import { Form } from 'antd'
import uuid from 'uuid4'
import 'image-manipulation'
import {
  postUpload,
  postUploadClear,
  requestImageLabels,
  addImageLabels,
  updateImageLabeling,
  removeImageLabels,
  saveImageLabels
} from 'store/actions'
import LoadingSpinner from '../LoadingSpinner'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import IconButton from '../../molecules/IconButton'
import Error from '../Error'
import ImageDropzone from '../../molecules/DropZone'
import ExistedImageDropzone from '../../molecules/ExistedDropZone'
import { Wrapper, ExistedImageWrapper, StyledText, ErrorWrapper, ImageBlockWrapper } from './styles'
import ModalImageForm from '../ModalImageForm'

const AddSingleImageWidget = ({
  required,
  setValue,
  clearError,
  register,
  setError,
  errors,
  values,
  name,
  headerText
}) => {
  const [visibleModal, setVisibleModal] = useState(false)
  const details = useSelector(({ imageWidget }) => imageWidget.details)
  const lastUploaded = useSelector(({ upload }) => upload.lastUploaded)
  const isUploading = useSelector(({ upload }) => upload.isUploading)
  const activeIndex = useSelector(({ upload }) => upload.activeIndex)
  const dispatch = useDispatch()

  const imageId = useMemo(() => {
    return uuid()
  }, [])
  const [isRotatingImage, setIsRotatingImage] = useState(false)
  const validationFieldValue = () => {
    clearError(name)
    if ((!values || !values[name]) && !isUploading) {
      if (required) setError(name, 'notMatch', intl.get('validation.requiredField'))
    }
  }

  useEffect(() => {
    validationFieldValue()
  }, [isUploading])

  const onDrop = (files, index, id) => {
    dispatch(postUpload({ file: files[0], index, id }))
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
  const [validUrl, setValidUrl] = useState(null)
  useEffect(() => {
    validationFieldValue()
    dispatch(postUploadClear())
    if (required) register({ name }, { required: intl.get('validation.requiredField') })
  }, [])
  useEffect(() => {
    if (values[name]) setValidUrl({ id: imageId, index: 0, url: values[name] })
  }, [values])
  useEffect(() => {
    if (lastUploaded && lastUploaded.url && lastUploaded.id === imageId) {
      setValue(name, lastUploaded.url)
      setValidUrl(lastUploaded)
      clearError(name)
      dispatch(postUploadClear())
    }
  }, [lastUploaded])

  const openCurrUrl = () => {
    setVisibleModal(true)
    console.log(validUrl)
  }
  const deleteImageBlock = () => {
    setValue(name, null)
  }
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
                <IconButton
                  type='SearchPlus'
                  popText={intl.get('widgets.images.zoom')}
                  styleParam={{ fontSize: 19, marginRight: 10 }}
                  actionFunction={() => openCurrUrl()}
                />
                <IconButton
                  type='Delete'
                  popText={intl.get('widgets.images.delete')}
                  actionFunction={() => deleteImageBlock()}
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
        {!!validUrl && (
          <ModalImageForm
            visibleModal={visibleModal}
            setVisibleModal={setVisibleModal}
            image={validUrl}
            requestImageLabels={requestImageLabels}
            details={details}
            list={{ response: {} }}
            addImageLabels={addImageLabels}
            updateImageLabeling={updateImageLabeling}
            removeImageLabels={removeImageLabels}
            saveImageLabels={saveImageLabels}
          />
        )}
      </Wrapper>
    </ProductEditWidgetWrapper>
  )
}

AddSingleImageWidget.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  required: PropTypes.bool,
  headerText: PropTypes.string
}

AddSingleImageWidget.defaultProps = {
  errors: {},
  values: null,
  required: false,
  headerText: null
}

export default AddSingleImageWidget
