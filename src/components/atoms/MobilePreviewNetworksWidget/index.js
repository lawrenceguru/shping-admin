import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import IconButton from '../../molecules/IconButton'
import { NetworksWidgetWrapper, IconWrapper } from './styles'

const ProductPreviewNetworksWidget = ({ items }) => {
  const sliderRef = useRef(null)
  const [currImgIndex, setCurrImgIndex] = useState(0)

  const beforeChange = (prev, next) => {
    setCurrImgIndex(next)
  }

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    beforeChange
  }

  const getIcon = el => {
    switch (el) {
      case 'fb':
        return <img src='https://www.shping.com/static/media/fb.4811f932.svg' alt='facebook' />
      case 'youtube':
        return <img src='/images/youtube.png' alt='youtube' />
      case 'instagram':
        return <img src='/images/instagram.png' alt='instagram' />
      default:
        return <img src='/images/no-image.png' alt='type' />
    }
  }

  const next = () => {
    sliderRef.current.slickNext()
  }

  const prev = () => {
    sliderRef.current.slickPrev()
  }

  return (
    <NetworksWidgetWrapper>
      {currImgIndex !== 0 ? (
        <IconButton type='ArrowLeft' actionFunction={prev} styleParam={{ fontSize: 20, marginLeft: 10 }} />
      ) : (
        <div style={{ width: 23 }} />
      )}
      <div>
        <Slider {...settings} ref={sliderRef}>
          {items &&
            !!items.length &&
            items.map((icon, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <IconWrapper key={i}>
                <a href={icon.url} target='_blank' rel='noopener noreferrer'>
                  {`${icon.icon}`.search('https://') >= 0 ? <img src={icon.icon} alt='icon' /> : getIcon(icon.icon)}
                </a>
              </IconWrapper>
            ))}
        </Slider>
      </div>
      {items && items.length > 4 && currImgIndex !== items.length - 4 && (
        <IconButton type='ArrowRight' actionFunction={next} styleParam={{ fontSize: 20, marginLeft: 10 }} />
      )}
    </NetworksWidgetWrapper>
  )
}

ProductPreviewNetworksWidget.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
}

ProductPreviewNetworksWidget.defaultProps = {
  items: null
}

export default ProductPreviewNetworksWidget
