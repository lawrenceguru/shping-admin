import React from 'react'
import PropTypes from 'prop-types'
import { StyledImage, StyledContainerProductPhoto } from './styles'

const ProductImage = ({ image }) => {
  return (
    <StyledContainerProductPhoto>
      {image ? (
        <StyledImage src={`${image}?x-request=html${Math.floor(Math.random() * 100)}`} alt='Product' />
      ) : (
        <StyledImage src='/no-image-product.jpg' alt='Product' />
      )}
    </StyledContainerProductPhoto>
  )
}

ProductImage.propTypes = {
  image: PropTypes.string
}

ProductImage.defaultProps = {
  image: null
}
export default React.memo(ProductImage)
