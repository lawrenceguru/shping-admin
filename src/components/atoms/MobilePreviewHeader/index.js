import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { ProductNameText } from './styles'

const MobilePreviewHeader = ({ text }) => {
  return (
    <ProductNameText>
      <FontAwesomeIcon icon={faTags} style={{ marginRight: 8 }} />
      <span>{text ? text.toUpperCase() : null}</span>
    </ProductNameText>
  )
}

MobilePreviewHeader.propTypes = {
  text: PropTypes.string
}

MobilePreviewHeader.defaultProps = {
  text: null
}

export default MobilePreviewHeader
