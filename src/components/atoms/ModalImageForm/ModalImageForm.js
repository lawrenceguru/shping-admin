import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import uuid from 'uuid4'
import intl from 'react-intl-universal'
import { ImageWrapper, IconWrapper, IconButtonWrapper, CustomSelectWrapper, ControlPanel } from './styles'
import CustomSelect from '../CustomSelect'
import DraggableBoundingBox from './DraggableBoundingBox'
import ModalWithHeader from '../ModalWithHeader'

const { Option } = Select

const ModalImageForm = ({
  visibleModal,
  setVisibleModal,
  image,
  requestImageLabels,
  details,
  list,
  addImageLabels,
  updateImageLabeling,
  removeImageLabels,
  saveImageLabels
}) => {
  const [values, setValues] = useState([])
  const [deleteBndBox, setDeleteBndBox] = useState([])
  const imageRef = React.createRef()

  useEffect(() => {
    if (visibleModal) {
      requestImageLabels(image)
    }
  }, [requestImageLabels, visibleModal])

  const handleValueChange = useCallback(
    value => {
      setValues(value)
      const allValue = list.response.find(el => el.value === value)
      const bndbox = {
        ymin: 200,
        xmin: 200,
        xmax: 300,
        ymax: 300
      }
      addImageLabels({ ...allValue, bndbox })
    },
    [list]
  )

  const calcCoord = (bndbox, ymin, xmin, xmax, ymax) => {
    const height = bndbox.ymax - bndbox.ymin
    const width = bndbox.xmax - bndbox.xmin

    const coord = { ymin, xmin, xmax, ymax }

    if (ymin < 0) {
      coord.ymax = height
      coord.ymin = 0
    }
    if (xmin < 0) {
      coord.xmax = width
      coord.xmin = 0
    }

    return coord
  }

  const handleUpdateCoordinates = useCallback(
    ({ index, ymin, xmin, xmax, ymax }) => {
      const newObjects =
        details.objects && details.objects.length
          ? details.objects.map((object, i) => {
              if (i === index) {
                return {
                  ...object,
                  bndbox: calcCoord(object.bndbox, ymin, xmin, xmax, ymax)
                }
              }
              return { ...object }
            })
          : []
      updateImageLabeling({ ...details, objects: newObjects })
    },
    [details, details.objects]
  )

  const handleCheckBoxChange = (options, index) => {
    setDeleteBndBox(prevState => {
      const preState = [...prevState]
      if (preState.includes(index) && options) {
        preState.splice(preState.indexOf(index), 1)
        return preState
      }
      return [...preState, index]
    })
  }

  const handleRemove = () => {
    setDeleteBndBox([])
    setValues([])
    removeImageLabels(deleteBndBox)
  }

  const handleSave = () => {
    const { offsetHeight, offsetWidth } = imageRef.current

    const payload = {
      path: image,
      size: {
        width: offsetWidth,
        height: offsetHeight,
        depth: 3
      },
      objects: details.objects && details.objects.filter(object => object.name)
    }

    setDeleteBndBox([])
    setValues([])
    saveImageLabels(payload)
  }

  const handleOk = () => {
    handleSave()
  }

  const handleCancel = () => {
    setVisibleModal(false)
  }

  return (
    visibleModal && (
      <ModalWithHeader
        bodyStyle={{ minHeight: '80vh', overflowY: 'hidden' }}
        width={900}
        okText={intl.get('save')}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <ControlPanel>
          <CustomSelect
            handleValueChange={handleValueChange}
            placeholder={intl.get('widgets.images.defaultSelectLabel')}
            value={values}
          >
            {list &&
              list.response &&
              list.response.map((el, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Option key={i} value={el.value}>
                  {el.label}
                </Option>
              ))}
          </CustomSelect>
          <IconWrapper>
            <IconButtonWrapper
              type='DeleteTrash'
              styleParam={{ fontSize: '25px', color: !deleteBndBox.length === true ? '#cecece' : '#ff4c4f' }}
              disabled={!deleteBndBox.length}
              actionFunction={handleRemove}
            />
            <IconButtonWrapper
              type='Save'
              styleParam={{ fontSize: '25px', color: '#ff4c4f' }}
              actionFunction={handleSave}
            />
          </IconWrapper>
        </ControlPanel>
        <CustomSelectWrapper>
          <ImageWrapper>
            <img src={image.url} alt='Preview' style={{ width: '100%', objectFit: 'cover' }} ref={imageRef} />
          </ImageWrapper>
          {!!details.objects &&
            details.objects.map((object, index) => {
              if (object && object.bndbox) {
                const { ymin, xmin, ymax, xmax } = object.bndbox
                const styles = {
                  top: ymin,
                  left: xmin,
                  width: Math.abs(xmax - xmin),
                  height: Math.abs(ymax - ymin)
                }
                return (
                  <DraggableBoundingBox
                    index={index}
                    styles={styles}
                    label={object.title}
                    onCheckBoxChange={handleCheckBoxChange}
                    onUpdateCoordinate={handleUpdateCoordinates}
                    /* eslint-disable-next-line react/no-array-index-key */
                    key={`${index}__${uuid()}`}
                    deleteBndBox={deleteBndBox}
                  />
                )
              }
              return null
            })}
        </CustomSelectWrapper>
      </ModalWithHeader>
    )
  )
}

ModalImageForm.propTypes = {
  visibleModal: PropTypes.bool.isRequired,
  setVisibleModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.object.isRequired,
  requestImageLabels: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  details: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.object,
  addImageLabels: PropTypes.func.isRequired,
  updateImageLabeling: PropTypes.func.isRequired,
  removeImageLabels: PropTypes.func.isRequired,
  saveImageLabels: PropTypes.func.isRequired
}
ModalImageForm.defaultProps = {
  list: {}
}
export default ModalImageForm
