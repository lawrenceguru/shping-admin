import React, { useState, useCallback } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ProductImage, ImageWrapper } from './styles'
import ModalImageForm from '../ModalImageForm'

const settings = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

const MobilePreviewImageWidget = ({ images }) => {
  const [imgForPreview, setImgForPreview] = useState(null)
  const toggleModal = useCallback(() => {
    if (imgForPreview) {
      setImgForPreview(null)
    }
  }, [imgForPreview, setImgForPreview])
  return (
    <ProductImage>
      {images && !!images.length ? (
        <>
          <Slider {...settings}>
            {images.map((el, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <ImageWrapper key={i} onClick={() => setImgForPreview(el)}>
                <img src={el.url} alt='Product' />
              </ImageWrapper>
            ))}
          </Slider>
        </>
      ) : (
        <img src='/no-image-product.jpg' alt='Product' />
      )}
      {!!imgForPreview && (
        <ModalImageForm setVisibleModal={toggleModal} visibleModal={!!imgForPreview} image={imgForPreview} />
      )}
    </ProductImage>
  )
}

MobilePreviewImageWidget.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object)
}

MobilePreviewImageWidget.defaultProps = {
  images: null
}

export default MobilePreviewImageWidget
