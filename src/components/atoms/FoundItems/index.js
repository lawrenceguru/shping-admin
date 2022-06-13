import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { StyledText } from './styles'

const FoundItems = ({ count, text }) => {
  return <StyledText>{intl.get('found', { count, text })}</StyledText>
}

FoundItems.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string
}

FoundItems.defaultProps = {
  count: 0,
  text: ''
}

export default FoundItems
