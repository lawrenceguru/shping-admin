import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { icons } from '../../../utils/consts'
import { List, IconWrapper, Title, Image, Accept } from './styles'
import UploadImg from '../../atoms/UploadImg'
import IconButton from '../../molecules/IconButton'

const IconList = ({ setValue, name, titleUpload, clearError, defaultValue }) => {
  const [activeIcon, setActiveIcon] = useState('')
  const customIcon = useMemo(() => {
    return icons.filter(icon => icon.value === 'custom')[0]
  }, [icons])
  const renderedIcons = useMemo(() => {
    return icons.filter(icon => icon.value !== 'custom')
  }, [icons])

  const setActiveCustomIcon = url => {
    setActiveIcon(customIcon.value)
    setValue(name, url)
  }

  const setDefaultValue = useCallback(() => {
    const item = icons.filter(icon => icon.value === defaultValue)
    return item.length ? setActiveIcon(item[0].value) : setActiveIcon(customIcon.value)
  }, [icons])

  useEffect(() => {
    if (defaultValue && !activeIcon) {
      setDefaultValue()
    }
  }, [defaultValue, activeIcon])

  return (
    <>
      {renderedIcons.map(icon => {
        const { description, value, url } = icon
        return (
          <List
            key={value}
            onClick={() => {
              setActiveIcon(value)
              setValue(name, value)
              clearError(name)
            }}
          >
            <IconWrapper active={value === activeIcon}>
              <Accept>
                <IconButton type='Check' styleParam={{ color: '#ef3d46' }} />
              </Accept>
              <Image src={url} alt={value} />
            </IconWrapper>
            <Title>{value === 'fb' ? 'Facebook' : description.replace(' icon', '')}</Title>
          </List>
        )
      })}
      <UploadImg
        setValue={setValue}
        description={customIcon.description}
        setActivateIcon={setActiveCustomIcon}
        active={customIcon.value === activeIcon}
        name={name}
        titleUpload={titleUpload}
        clearError={clearError}
        defaultValue={customIcon.value === activeIcon ? defaultValue : ''}
      />
    </>
  )
}
IconList.propTypes = {
  setValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  titleUpload: PropTypes.string,
  clearError: PropTypes.func.isRequired,
  defaultValue: PropTypes.string
}

IconList.defaultProps = {
  titleUpload: '',
  defaultValue: ''
}

export default IconList
