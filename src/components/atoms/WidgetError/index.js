import React from 'react'
import PropTypes from 'prop-types'
import { StyledWidgetError } from './styles'

const WidgetError = ({ text }) => {
  return <StyledWidgetError>{text}</StyledWidgetError>
}

WidgetError.propTypes = {
  text: PropTypes.string
}

WidgetError.defaultProps = {
  text: null
}
export default WidgetError
