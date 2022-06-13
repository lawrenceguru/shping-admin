import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../molecules/IconButton'
import { NoContentWrapper } from './styles'

const NoContent = ({ text, subText, iconType, fontSize, iconFontSize }) => {
  return (
    <NoContentWrapper fontSize={fontSize}>
      <div>
        <IconButton type={iconType} styleParam={{ fontSize: iconFontSize }} />
      </div>
      <div>
        {subText && (
          <>
            <span>{subText}</span>
            <br />
          </>
        )}
        <span>{text}</span>
      </div>
    </NoContentWrapper>
  )
}

NoContent.propTypes = {
  text: PropTypes.string,
  subText: PropTypes.string,
  iconType: PropTypes.string,
  fontSize: PropTypes.string,
  iconFontSize: PropTypes.string
}

NoContent.defaultProps = {
  text: null,
  subText: null,
  iconType: 'InfoCircle',
  fontSize: null,
  iconFontSize: null
}

export default NoContent
