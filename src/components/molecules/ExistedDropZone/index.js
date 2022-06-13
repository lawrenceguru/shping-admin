import React from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-basis: 80%;
  transition: all 0.3s ease-in;
  text-align: center;
`

const ExistedImageDropzone = ({ onDrop, children, video, disabled, format }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Wrapper {...getRootProps({ refKey: 'innerRef' })}>
      <input
        {...getInputProps()}
        accept={format || (video ? 'video/mp4,video/x-m4v,video/*' : 'image/*')}
        disabled={disabled}
      />
      {children}
    </Wrapper>
  )
}

ExistedImageDropzone.propTypes = {
  onDrop: PropTypes.func.isRequired,
  children: PropTypes.element,
  video: PropTypes.bool,
  disabled: PropTypes.bool,
  format: PropTypes.string
}

ExistedImageDropzone.defaultProps = {
  video: false,
  children: null,
  disabled: false,
  format: null
}

export default ExistedImageDropzone
