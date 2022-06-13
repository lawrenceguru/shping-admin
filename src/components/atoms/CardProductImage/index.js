import React from 'react'
import PropTypes from 'prop-types'
import { StyledImage } from './styles'

const CardProductImage = ({ width, maxWidth, maxHeight, imageSrc }) => {
  return (
    <StyledImage
      src={imageSrc || '/no-image-product.jpg'}
      width={width}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      alt='product'
    />
  )
}

CardProductImage.propTypes = {
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  imageSrc: PropTypes.string
}

CardProductImage.defaultProps = {
  width: null,
  maxWidth: null,
  maxHeight: null,
  imageSrc: null
}

export default CardProductImage
