import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { StyledText } from './styles'

const WidgetRemaining = ({ value, position, textAlign, marginBottom, top }) => {
  return (
    <StyledText position={position} marginBottom={marginBottom} top={top} textAlign={textAlign}>
      <div>
        {intl.get('validation.remaining')}: {value}
      </div>
    </StyledText>
  )
}

WidgetRemaining.propTypes = {
  value: PropTypes.number,
  position: PropTypes.string,
  textAlign: PropTypes.string,
  marginBottom: PropTypes.string,
  top: PropTypes.string
}

WidgetRemaining.defaultProps = {
  position: null,
  textAlign: null,
  marginBottom: null,
  top: null,
  value: null
}

export default WidgetRemaining
