import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Checkbox, Form, Input, Select } from 'antd'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { RHFInput } from 'react-hook-form-input'
import LoadingSpinner from '../LoadingSpinner'
import CustomButton from '../../molecules/Button'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import IconButton from '../../molecules/IconButton'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import Error from '../Error'
import ImageDropzone from '../../molecules/DropZone'
import ExistedImageDropzone from '../../molecules/ExistedDropZone'
import 'image-manipulation'
import { Wrapper, ContentWrapper, ErrorWrapper, ExistedImageWrapper, ImageBlockWrapper, StyledText } from './styles'

const { Option } = Select
const ProductEditCertificatesWidget = ({
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
  register,
  getGdtiCertificates,
  certificates
}) => {
  const [checkBoxes, setCheckBoxes] = useState([])

  const validationFieldValue = (field, value) => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].certificates.${field}`)
    if (!value) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].certificates.${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }

  const validationOneCertificateFieldValue = (field, value, index) => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].certificates.list[${index}].${field}`)
    if (!value) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].certificates.list[${index}].${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }

  const validateAllCertificatesList = list => {
    list.forEach((el, index) => {
      if (!list[index].img_url) {
        setError(
          `sources[${activeSource}].data[${widgetIndex}].certificates.list[${index}].img_url`,
          'notMatch',
          intl.get('validation.requiredField')
        )
      }
    })
  }

  const setNewCheckboxes = list => {
    const newCheckboxes = []
    list.forEach((el, index) => {
      newCheckboxes[index] = el.expired
    })
    setCheckBoxes(newCheckboxes)
  }

  useEffect(() => {
    if (!data.certificates || !data.certificates.title) {
      validationFieldValue('title', '')
    }
    if (!data.certificates.list || !data.certificates.list.length || !data.certificates.list[0].img_url) {
      validationOneCertificateFieldValue('img_url', '', 0)
    }

    setNewCheckboxes(data.certificates.list)
  }, [])

  const wrapperRef = useRef(null)
  const [staticHeight, setStaticHeight] = useState('auto')

  useEffect(() => {
    if (!certificates.length) {
      getGdtiCertificates()
    }
    postUploadClear()
  }, [])

  const handleValueChange = (field, value) => {
    const newValue = value.trimLeft().replace('  ', ' ')
    validationFieldValue(field, newValue)
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].certificates[field] = newValue
    setValue('sources', newSources)
  }

  const handleValueOneCertificateChange = (field, value, index) => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].certificates.list[index][field] = value
    setNewCheckboxes(newSources[activeSource].data[widgetIndex].certificates.list)
    setValue('sources', newSources)
  }

  const addCertificatesBlock = () => {
    const newSources = [...sources]
    const newCertificatesBlocks = [...newSources[activeSource].data[widgetIndex].certificates.list]
    newCertificatesBlocks.push({ expired: false, gdti: null, img_url: null })
    newSources[activeSource].data[widgetIndex].certificates.list = newCertificatesBlocks
    validationOneCertificateFieldValue('img_url', '', newCertificatesBlocks.length - 1)
    setValue('sources', newSources)
  }

  const onDrop = (files, index, id) => {
    const activeFile = files.length > 1 ? files[files.length - 1] : files[0]
    postUpload({ file: activeFile, index, id })
    handleValueOneCertificateChange('gdti', '', index)
  }

  const deleteCertificatesBlock = index => {
    const newSources = [...sources]
    const newCertificatesBlocks = [...newSources[activeSource].data[widgetIndex].certificates.list]
    newCertificatesBlocks.splice(index, 1)
    clearError(`sources[${activeSource}].data[${widgetIndex}].certificates.list[${index}].img_url`)
    newSources[activeSource].data[widgetIndex].certificates.list = newCertificatesBlocks.length
      ? newCertificatesBlocks
      : [{ expired: false, gdti: null, img_url: null }]
    setValue('sources', newSources)
    validateAllCertificatesList(newCertificatesBlocks)
  }

  const rotateImageBlock = (url, index) => {
    const { ImageMethods } = window

    ImageMethods.getCanvasFromUrl(`${url}?cacheblock=true`, canvas => {
      const instance = new ImageMethods(canvas)
      instance.rotate(90)
      onDrop([ImageMethods.toBlob(instance.canvas)], index, data.id)
    })
  }

  useEffect(() => {
    if (lastUploaded && lastUploaded.url && lastUploaded.id === data.id) {
      const newSources = [...sources]
      const newCertificatesBlocks = [...newSources[activeSource].data[widgetIndex].certificates.list]
      newCertificatesBlocks[lastUploaded.index] = { img_url: lastUploaded.url }
      newSources[activeSource].data[widgetIndex].certificates.list = newCertificatesBlocks
      setValue('sources', newSources)
      validationOneCertificateFieldValue('img_url', lastUploaded.url, lastUploaded.index)
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
    const newCertificatesBlocks = [...newSources[activeSource].data[widgetIndex].certificates.list]
    const items = reorder(newCertificatesBlocks, result.source.index, result.destination.index)
    setNewCheckboxes(items)
    newSources[activeSource].data[widgetIndex].certificates.list = items
    setValue('sources', newSources)
    setStaticHeight('auto')
    validateAllCertificatesList(items)
  }

  const onDragStart = () => {
    if (wrapperRef && wrapperRef.current) {
      setStaticHeight(wrapperRef.current.clientHeight)
    }
  }

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('widgets.certificates.title')}
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
      <Form.Item label={intl.get('widgets.popup.displayTitle')}>
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} />}
          rules={{ required: true }}
          register={register}
          setValue={setValue}
          value={data && data.certificates && data.certificates.title}
          onChange={e => {
            const { value } = e.target
            handleValueChange('title', value)
          }}
        />
        <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].certificates.title`} />
      </Form.Item>
      <Wrapper ref={wrapperRef} style={{ height: staticHeight }}>
        <DragDropContext onBeforeDragStart={onDragStart} onDragEnd={onDragEnd}>
          <Droppable droppableId={`droppable${widgetIndex}`} isDropDisabled={isSelectsDisable}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {data &&
                  data.certificates &&
                  data.certificates.list &&
                  data.certificates.list.map((el, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Draggable key={`${widgetIndex}${index}`} draggableId={`${widgetIndex}${index}`} index={index}>
                      {provideds => {
                        return (
                          <div ref={provideds.innerRef} {...provideds.draggableProps} {...provideds.dragHandleProps}>
                            <ContentWrapper>
                              <Form.Item label={intl.get('widgets.certificates.content')}>
                                <StyledText>
                                  {el.img_url && (
                                    <IconButton
                                      type='Rotate'
                                      popText={intl.get('widgets.images.rotate')}
                                      styleParam={{ fontSize: 19, marginRight: 10 }}
                                      actionFunction={() => rotateImageBlock(el.img_url, index)}
                                      visible={!isSelectsDisable}
                                    />
                                  )}
                                  <IconButton
                                    type='Delete'
                                    popText={intl.get('widgets.certificates.delete')}
                                    actionFunction={() => deleteCertificatesBlock(index)}
                                    visible={!isSelectsDisable}
                                  />
                                </StyledText>
                                <LoadingSpinner isLoading={isUploading === data.id && index === activeIndex}>
                                  <ImageBlockWrapper>
                                    {!el.img_url ? (
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
                                          <img src={el.img_url} alt='Preview' />
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
                                <p
                                  style={{
                                    position: 'absolute',
                                    bottom: '-55px'
                                  }}
                                >
                                  <RHFInput
                                    as={<Checkbox size='large' disabled={isSelectsDisable} />}
                                    checked={checkBoxes[index]}
                                    register={register}
                                    onChange={e => {
                                      handleValueOneCertificateChange('expired', e.target.checked, index)
                                    }}
                                    setValue={setValue}
                                  >
                                    {intl.get('widgets.certificates.expired')}
                                  </RHFInput>
                                </p>
                                <Error
                                  errors={errors}
                                  /* eslint-disable-next-line max-len */
                                  destination={`sources[${activeSource}].data[${widgetIndex}].certificates.list[${index}].img_url`}
                                />
                              </Form.Item>
                            </ContentWrapper>
                            <Form.Item label={intl.get('widgets.certificates.selectTitle')}>
                              <Select
                                showSearch
                                style={{ width: '100%' }}
                                optionFilterProp='children'
                                filterOption={(input, option) =>
                                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                getPopupContainer={trigger => trigger.parentNode}
                                value={
                                  (data.certificates && data.certificates.list && data.certificates.list[index].gdti) ||
                                  undefined
                                }
                                placeholder={intl.get('widgets.certificates.textPlaceholder')}
                                onChange={value => {
                                  if (value === data.certificates.list[index].gdti) {
                                    return
                                  }
                                  handleValueOneCertificateChange('gdti', value, index)
                                  const currentGdti = certificates
                                    ? certificates.find(elem => elem.value === value)
                                    : null
                                  if (currentGdti && currentGdti.image) {
                                    handleValueOneCertificateChange('img_url', currentGdti.image, index)
                                  }
                                  clearError(
                                    `sources[${activeSource}].data[${widgetIndex}].certificates.list[${index}].img_url`
                                  )
                                }}
                              >
                                {certificates &&
                                  certificates.map(elem => (
                                    <Option style={{ fontSize: 16 }} key={elem.value} value={elem.value}>
                                      {elem.label}
                                    </Option>
                                  ))}
                              </Select>
                            </Form.Item>
                          </div>
                        )
                      }}
                    </Draggable>
                  ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <ErrorWrapper>
          <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].certificates`} />
        </ErrorWrapper>
        <CustomButton
          text={intl.get('widgets.certificates.buttonText')}
          width='120px'
          handleClick={addCertificatesBlock}
          disabled={isSelectsDisable}
        />
      </Wrapper>
    </ProductEditWidgetWrapper>
  )
}

ProductEditCertificatesWidget.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  postUpload: PropTypes.func.isRequired,
  isUploading: PropTypes.number,
  widgetIndex: PropTypes.number.isRequired,
  sources: PropTypes.arrayOf(PropTypes.object),
  isSelectsDisable: PropTypes.bool,
  activeSource: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  lastUploaded: PropTypes.object,
  activeIndex: PropTypes.number,
  postUploadClear: PropTypes.func.isRequired,
  getGdtiCertificates: PropTypes.func.isRequired,
  certificates: PropTypes.arrayOf(PropTypes.object)
}

ProductEditCertificatesWidget.defaultProps = {
  errors: {},
  data: {},
  isUploading: 0,
  activeIndex: null,
  sources: [],
  isSelectsDisable: false,
  certificates: [],
  lastUploaded: null
}

export default ProductEditCertificatesWidget
