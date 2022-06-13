import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Form } from 'antd'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import LoadingSpinner from '../LoadingSpinner'
import CustomButton from '../../molecules/Button'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import IconButton from '../../molecules/IconButton'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import Error from '../Error'
import ImageDropzone from '../../molecules/DropZone'
import ExistedImageDropzone from '../../molecules/ExistedDropZone'
import { Wrapper, ExistedImageWrapper, StyledText, ErrorWrapper, ImageBlockWrapper } from './styles'
import 'image-manipulation'
import ModalImageForm from '../ModalImageForm'

const ProductEditImagesWidget = ({
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
  isUploading,
  lastUploaded,
  activeIndex,
  postUploadClear,
  requestImageLabels,
  details,
  lists,
  addImageLabels,
  updateImageLabeling,
  removeImageLabels,
  saveImageLabels
}) => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [isRotatingImage, setIsRotatingImage] = useState(false)
  const validationFieldValue = () => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].image`)
    if (!data.image || !data.image.length || (data.image.length === 1 && !data.image[0].url && !isUploading)) {
      setError(`sources[${activeSource}].data[${widgetIndex}].image`, 'notMatch', intl.get('validation.requiredField'))
    }
  }

  const wrapperRef = useRef(null)
  const [staticHeight, setStaticHeight] = useState('auto')

  useEffect(() => {
    validationFieldValue()
    postUploadClear()
  }, [])

  useEffect(() => {
    if (!isUploading) {
      validationFieldValue()
    }
  }, [isUploading])

  const addImageBlock = () => {
    const newSources = [...sources]
    const newImageBlocks = [...newSources[activeSource].data[widgetIndex].image]
    newImageBlocks.push({ url: null })
    newSources[activeSource].data[widgetIndex].image = newImageBlocks
    setValue('sources', newSources)
  }

  const onDrop = (files, index, id) => {
    if (files.length > 1) {
      files.forEach((el, indexs) => {
        if (indexs > 0) {
          postUpload({ file: el, index: sources[activeSource].data[widgetIndex].image.length, id })
        } else {
          postUpload({ file: el, index, id })
        }
      })
    } else {
      postUpload({ file: files[0], index, id })
    }
  }

  const deleteImageBlock = index => {
    const newSources = [...sources]
    const newImageBlocks = [...newSources[activeSource].data[widgetIndex].image]
    newImageBlocks.splice(index, 1)
    newSources[activeSource].data[widgetIndex].image = newImageBlocks.length ? newImageBlocks : [{ url: null }]
    setValue('sources', newSources)
    validationFieldValue()
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
    if (lastUploaded && lastUploaded.url && lastUploaded.id === data.id) {
      const newSources = [...sources]
      const newImageBlocks = [...newSources[activeSource].data[widgetIndex].image]
      newImageBlocks[lastUploaded.index] = { url: lastUploaded.url }
      newSources[activeSource].data[widgetIndex].image = newImageBlocks
      setValue('sources', newSources)
      validationFieldValue()
      postUploadClear()
    }
  }, [lastUploaded])

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }
  const onDragEnd = result => {
    if (!result.destination) {
      return
    }
    const newSources = [...sources]
    const newImageBlocks = [...newSources[activeSource].data[widgetIndex].image]
    const items = reorder(newImageBlocks, result.source.index, result.destination.index)
    newSources[activeSource].data[widgetIndex].image = items
    setValue('sources', newSources)
    setStaticHeight('auto')
  }

  const onDragStart = () => {
    if (wrapperRef && wrapperRef.current) {
      setStaticHeight(wrapperRef.current.clientHeight)
    }
  }
  const [validUrl, setValidUrl] = useState(null)
  const openCurrUrl = index => {
    setVisibleModal(true)
    if (data && data.image) {
      const test = data.image.find((el, i) => i === index)
      setValidUrl(test)
    }
    return {}
  }

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('widgets.images.title')}
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
      <Wrapper ref={wrapperRef} style={{ height: staticHeight }}>
        <DragDropContext onBeforeDragStart={onDragStart} onDragEnd={onDragEnd}>
          <Droppable droppableId='droppable' isDropDisabled={isSelectsDisable}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {data &&
                  data.image &&
                  data.image.map((el, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <React.Fragment key={`${el.url}${index}${index}`}>
                      {/* eslint-disable-next-line react/no-array-index-key */}
                      <Draggable key={`${el.url}${index}`} draggableId={`${el.url}${index}`} index={index}>
                        {provideds => (
                          <div ref={provideds.innerRef} {...provideds.draggableProps} {...provideds.dragHandleProps}>
                            <Form.Item label={intl.get('widgets.images.content')}>
                              <StyledText>
                                {el.url && (
                                  <>
                                    <IconButton
                                      type='RotateLeft'
                                      popText={intl.get('widgets.images.rotate')}
                                      styleParam={{ fontSize: 19, marginRight: 10 }}
                                      actionFunction={() => rotateImageBlock(el.url, index, 'rotateLeft', data.id)}
                                      visible={!isSelectsDisable}
                                    />
                                    <IconButton
                                      type='Rotate'
                                      popText={intl.get('widgets.images.rotate')}
                                      styleParam={{ fontSize: 19, marginRight: 10 }}
                                      actionFunction={() => rotateImageBlock(el.url, index, 'rotateRight', data.id)}
                                      visible={!isSelectsDisable}
                                    />
                                  </>
                                )}
                                {el.url && (
                                  <IconButton
                                    type='SearchPlus'
                                    popText={intl.get('widgets.images.zoom')}
                                    styleParam={{ fontSize: 19, marginRight: 10 }}
                                    actionFunction={() => openCurrUrl(index)}
                                    visible={!isSelectsDisable}
                                  />
                                )}
                                <IconButton
                                  type='Delete'
                                  popText={intl.get('widgets.images.delete')}
                                  actionFunction={() => deleteImageBlock(index)}
                                  visible={!isSelectsDisable}
                                />
                              </StyledText>
                              <LoadingSpinner
                                isLoading={(isUploading === data.id && index === activeIndex) || isRotatingImage}
                              >
                                <ImageBlockWrapper>
                                  {!el.url ? (
                                    <ImageDropzone
                                      onDrop={files => {
                                        onDrop(files, index, data.id)
                                      }}
                                      disabled={isSelectsDisable}
                                    />
                                  ) : (
                                    <ExistedImageWrapper>
                                      <ExistedImageDropzone
                                        onDrop={files => {
                                          onDrop(files, index, data.id)
                                        }}
                                        disabled={isSelectsDisable}
                                      >
                                        <img src={el.url} alt='Preview' />
                                      </ExistedImageDropzone>
                                    </ExistedImageWrapper>
                                  )}
                                  <IconButton
                                    type='List'
                                    styleParam={{ fontSize: 20, marginRight: 10 }}
                                    visible={false}
                                  />
                                </ImageBlockWrapper>
                              </LoadingSpinner>
                            </Form.Item>
                          </div>
                        )}
                      </Draggable>
                    </React.Fragment>
                  ))}
                {!!validUrl && (
                  <ModalImageForm
                    visibleModal={visibleModal}
                    setVisibleModal={setVisibleModal}
                    image={validUrl}
                    requestImageLabels={requestImageLabels}
                    details={details}
                    list={lists}
                    addImageLabels={addImageLabels}
                    updateImageLabeling={updateImageLabeling}
                    removeImageLabels={removeImageLabels}
                    saveImageLabels={saveImageLabels}
                  />
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <ErrorWrapper>
          <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].image`} />
        </ErrorWrapper>
        <CustomButton
          text={intl.get('widgets.images.buttonText')}
          width='110px'
          handleClick={addImageBlock}
          disabled={isSelectsDisable}
        />
      </Wrapper>
    </ProductEditWidgetWrapper>
  )
}

ProductEditImagesWidget.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  postUpload: PropTypes.func.isRequired,
  isUploading: PropTypes.string,
  widgetIndex: PropTypes.number.isRequired,
  sources: PropTypes.arrayOf(PropTypes.object),
  isSelectsDisable: PropTypes.bool,
  activeSource: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  lastUploaded: PropTypes.object,
  postUploadClear: PropTypes.func.isRequired,
  activeIndex: PropTypes.number,
  requestImageLabels: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  details: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  lists: PropTypes.array.isRequired,
  addImageLabels: PropTypes.func.isRequired,
  updateImageLabeling: PropTypes.func.isRequired,
  removeImageLabels: PropTypes.func.isRequired,
  saveImageLabels: PropTypes.func.isRequired
}

ProductEditImagesWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false,
  isUploading: 0,
  lastUploaded: null,
  activeIndex: null
}

export default ProductEditImagesWidget
