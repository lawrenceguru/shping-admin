import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'
import placeholder from '../../../assets/logo-placeholder.png'
import { Wrapper, IconWrapper, ImageWrapper, ButtonWrapper, PlaceholderDiv, Title } from './styles'
import { List, Image, Accept } from '../../organisms/IconList/styles'
import Button from '../../atoms/Button'
import IconButton from '../IconButton'

const TodoDropZone = ({ onDrop, disabled, description, url, active, setActivateIcon, titleUpload, defaultValue }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const isNeedPlaceholder = useMemo(() => {
    return !active && (url || defaultValue)
  }, [active, url, defaultValue])

  const isImgExistAndActive = useMemo(() => {
    return (url || defaultValue) && active
  }, [url, active, defaultValue])

  const propsWrapper = useMemo(() => {
    return !url && !defaultValue ? getRootProps({ refKey: 'innerRef' }) : {}
  }, [url, defaultValue])
  return (
    <Wrapper {...propsWrapper}>
      <List>
        <IconWrapper
          exist={isImgExistAndActive}
          active={active}
          onClick={() => {
            if (setActivateIcon) {
              setActivateIcon(url || defaultValue)
            }
          }}
        >
          <Accept>
            <IconButton type='Check' styleParam={{ color: '#ef3d46' }} />
          </Accept>
          <ImageWrapper>
            <Image src={url || defaultValue || placeholder} alt='Upload' />
            {!url && !defaultValue && <input {...getInputProps()} accept='image/*' disabled={disabled} />}
          </ImageWrapper>
          {isImgExistAndActive && (
            <ButtonWrapper {...getRootProps({ refKey: 'innerRef' })}>
              <Button type='danger' size='small'>
                {titleUpload}
                <input {...getInputProps()} accept='image/*' disabled={disabled} />
              </Button>
            </ButtonWrapper>
          )}
        </IconWrapper>
        {isNeedPlaceholder && <PlaceholderDiv />}
        <Title existUrl={url || defaultValue}>{description}</Title>
      </List>
    </Wrapper>
  )
}

TodoDropZone.propTypes = {
  onDrop: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  description: PropTypes.string,
  url: PropTypes.string,
  active: PropTypes.bool,
  titleUpload: PropTypes.string,
  setActivateIcon: PropTypes.func,
  defaultValue: PropTypes.string
}

TodoDropZone.defaultProps = {
  disabled: false,
  description: '',
  url: null,
  active: false,
  titleUpload: '',
  setActivateIcon: null,
  defaultValue: ''
}

export default TodoDropZone
