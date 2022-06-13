import React from 'react'
import PropTypes from 'prop-types'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { StyledError } from './styles'

const Error = ({ errors, destination, marginTop, marginBottom, fontSize, whiteSpace }) => {
  return (
    <StyledError
      style={{
        visibility: errors[destination] ? 'visible' : 'hidden'
      }}
      marginTop={marginTop}
      marginBottom={marginBottom}
      fontSize={fontSize}
      white-space={whiteSpace || 'normal'}
    >
      {errors[destination] && errors[destination].message}
    </StyledError>
  )
}

Error.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  destination: PropTypes.string.isRequired,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  fontSize: PropTypes.string,
  whiteSpace: PropTypes.string
}

Error.defaultProps = {
  errors: {},
  marginTop: null,
  marginBottom: null,
  fontSize: null,
  whiteSpace: null
}

export default Error
