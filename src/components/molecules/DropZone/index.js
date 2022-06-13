import React from 'react'
import { useDropzone } from 'react-dropzone'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import IconButton from '../IconButton'

const Wrapper = styled.div`
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  border-radius: 10px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-basis: 80%;
  transition: all 0.3s ease-in;
  text-align: center;
  & svg {
    height: 64px;
    width: 64px !important;
  }
`

const StyledDiv = styled.div`
  width: 150px;
  height: 45px;
  font-size: 12px;
  padding: 6px 23px !important;
  background: #3f4257;
  border-radius: 30px;
  color: white;
  font-weight: 300;
  margin: 10px 0;
  transition: all 0.2s ease-in;
  cursor: pointer;
  outline: none;
  border: none;
  & p {
    margin-bottom: 0;
  }
`
const ImageDropzone = ({ onDrop, video, disabled, format, isUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <Wrapper {...getRootProps({ refKey: 'innerRef' })}>
      {isUpload ? (
        <IconButton type='Check' styleParam={{ color: '#ef3d46' }} />
      ) : (
        <img src='/images/upload.svg' alt='Upload' />
      )}
      <StyledDiv>
        <input
          {...getInputProps()}
          accept={format || (video ? 'video/mp4,video/x-m4v,video/*' : 'image/*')}
          disabled={disabled}
        />
        {isDragActive ? (
          <p>{intl.get('dropZone.dropFilesHere')} ...</p>
        ) : (
          <p>
            {intl.get('dropZone.dropFilesToUpload')} <br /> ({intl.get('dropZone.clickHere')}){' '}
          </p>
        )}
      </StyledDiv>
    </Wrapper>
  )
}

ImageDropzone.propTypes = {
  onDrop: PropTypes.func.isRequired,
  video: PropTypes.bool,
  disabled: PropTypes.bool,
  format: PropTypes.string,
  isUpload: PropTypes.bool
}

ImageDropzone.defaultProps = {
  video: false,
  disabled: false,
  format: null,
  isUpload: false
}

export default ImageDropzone
