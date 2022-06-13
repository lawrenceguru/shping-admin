import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { isNil } from 'lodash'
import Error from '../Error'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ImageDropzone from '../../molecules/DropZone'
import ExistedImageDropzone from '../../molecules/ExistedDropZone'
import IconButton from '../../molecules/IconButton'
import LoadingSpinner from '../LoadingSpinner'
import { ExistedImageWrapper, PreviewImageWrapper, RotateWrapper } from './styles'

const PreviewImage = ({
  setValue,
  errors,
  url,
  sources,
  activeSource,
  widgetIndex,
  id,
  isSelectsDisable,
  postUpload,
  lastUploaded,
  blockIndex,
  postUploadClear,
  isUploading,
  destination,
  styles,
  validationFieldValue,
  fieldForValidation
}) => {
  const onDrop = files => {
    const activeFile = files.length > 1 ? files[files.length - 1] : files[0]
    postUpload({ file: activeFile, index: widgetIndex, id })
  }

  const rotateImageBlock = () => {
    const { ImageMethods } = window

    ImageMethods.getCanvasFromUrl(`${url}?cacheblock=true`, canvas => {
      const instance = new ImageMethods(canvas)
      instance.rotate(90)
      onDrop([ImageMethods.toBlob(instance.canvas)])
    })
  }

  useEffect(() => {
    if (lastUploaded && lastUploaded.url && lastUploaded.index === widgetIndex && lastUploaded.id === id) {
      const newSources = [...sources]
      if (!isNil(blockIndex)) {
        newSources[activeSource].data[widgetIndex].social_networks[blockIndex].icon = lastUploaded.url
      } else {
        newSources[activeSource].data[widgetIndex].popup.icon = lastUploaded.url
      }
      setValue('sources', newSources)
      validationFieldValue(fieldForValidation, lastUploaded.url, blockIndex)
      postUploadClear()
    }
  }, [lastUploaded])

  return (
    <PreviewImageWrapper styles={styles}>
      <LoadingSpinner isLoading={isUploading === id}>
        {url ? (
          <>
            <RotateWrapper>
              <IconButton
                type='Rotate'
                popText={intl.get('widgets.images.rotate')}
                styleParam={{ fontSize: 19, marginRight: 10 }}
                actionFunction={() => rotateImageBlock(url)}
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
                <img src={url} alt='Preview' />
              </ExistedImageDropzone>
            </ExistedImageWrapper>
          </>
        ) : (
          <ImageDropzone
            onDrop={files => {
              onDrop(files)
            }}
            disabled={isSelectsDisable}
          />
        )}
        {destination && <Error errors={errors} destination={destination} />}
      </LoadingSpinner>
    </PreviewImageWrapper>
  )
}

PreviewImage.propTypes = {
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  activeSource: PropTypes.number.isRequired,
  widgetIndex: PropTypes.number.isRequired,
  sources: PropTypes.arrayOf(PropTypes.object),
  isSelectsDisable: PropTypes.bool,
  postUpload: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  lastUploaded: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  styles: PropTypes.object,
  postUploadClear: PropTypes.func.isRequired,
  isUploading: PropTypes.number,
  url: PropTypes.string,
  destination: PropTypes.string,
  validationFieldValue: PropTypes.func.isRequired,
  blockIndex: PropTypes.number,
  id: PropTypes.string.isRequired,
  fieldForValidation: PropTypes.string.isRequired
}

PreviewImage.defaultProps = {
  errors: {},
  sources: [],
  isSelectsDisable: false,
  isUploading: 0,
  lastUploaded: null,
  url: null,
  styles: null,
  destination: null,
  blockIndex: null
}

export default PreviewImage
