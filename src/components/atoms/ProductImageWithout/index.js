import React from 'react'
import PropTypes from 'prop-types'
import { StyledImage, StyledContainerProductPhoto } from './styles'

const ProductImageWithout = ({ image }) => {
  return (
    <StyledContainerProductPhoto>
      {image ? (
        <StyledImage src={`${image}?x-request=html${Math.floor(Math.random() * 1)}`} alt='Product' />
      ) : (
        <StyledImage src='/no-image-product.jpg' alt='Product' />
      )}
    </StyledContainerProductPhoto>
  )
}

ProductImageWithout.propTypes = {
  image: PropTypes.string
}

ProductImageWithout.defaultProps = {
  image: null
}
export default React.memo(ProductImageWithout)
