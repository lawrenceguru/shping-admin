import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import uuid from 'uuid4'
import LoadingSpinner from '../LoadingSpinner'
import IconButton from '../../molecules/IconButton'
import TodoDropZone from '../../molecules/TodoDropZone'
import { SpinnerWrapper, IconWrapper } from './styles'
import 'image-manipulation'

const UploadImg = ({
  setValue,
  isSelectsDisable,
  postUpload,
  isUploading,
  lastUploaded,
  activeIndex,
  postUploadClear,
  description,
  name,
  setActivateIcon,
  active,
  titleUpload,
  clearError,
  defaultValue
}) => {
  const [isRotatingImage, setIsRotatingImage] = useState(false)
  const [icon, setIcon] = useState({
    url: null,
    id: uuid(),
    index: 0
  })

  const onDrop = (file, index, id) => {
    postUpload({ file: file[0], index, id })
  }

  const rotateImage = (url, index, action, id) => {
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
    if (lastUploaded && lastUploaded.url && lastUploaded.id === icon.id) {
      setIcon({ ...icon, url: lastUploaded.url })
      setValue(name, lastUploaded.url)
      clearError(name)
      postUploadClear()
    }
  }, [lastUploaded])

  return (
    <>
      <SpinnerWrapper>
        <LoadingSpinner isLoading={(isUploading === icon.id && icon.index === activeIndex) || isRotatingImage}>
          <TodoDropZone
            onDrop={files => {
              onDrop(files, icon.index, icon.id)
            }}
            disabled={isSelectsDisable}
            description={description}
            url={icon.url}
            setActivateIcon={setActivateIcon}
            active={active}
            titleUpload={titleUpload}
            defaultValue={defaultValue}
          />
        </LoadingSpinner>
        {icon.url && (
          <IconWrapper>
            <IconButton
              type='RotateLeft'
              popText={intl.get('widgets.images.rotate')}
              styleParam={{ fontSize: 19, marginRight: 10 }}
              actionFunction={() => rotateImage(icon.url, icon.index, 'rotateLeft', icon.id)}
              visible={!isSelectsDisable}
            />
            <IconButton
              type='Rotate'
              popText={intl.get('widgets.images.rotate')}
              styleParam={{ fontSize: 19, marginRight: 10 }}
              actionFunction={() => rotateImage(icon.url, icon.index, 'rotateRight', icon.id)}
              visible={!isSelectsDisable}
            />
          </IconWrapper>
        )}
      </SpinnerWrapper>
    </>
  )
}

UploadImg.propTypes = {
  setValue: PropTypes.func.isRequired,
  postUpload: PropTypes.func.isRequired,
  isUploading: PropTypes.string,
  isSelectsDisable: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  lastUploaded: PropTypes.object,
  postUploadClear: PropTypes.func.isRequired,
  activeIndex: PropTypes.number,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  setActivateIcon: PropTypes.func,
  active: PropTypes.bool,
  titleUpload: PropTypes.string,
  clearError: PropTypes.func.isRequired,
  defaultValue: PropTypes.string
}

UploadImg.defaultProps = {
  isSelectsDisable: false,
  isUploading: null,
  lastUploaded: null,
  activeIndex: null,
  description: '',
  active: false,
  titleUpload: '',
  setActivateIcon: null,
  defaultValue: ''
}

export default UploadImg
