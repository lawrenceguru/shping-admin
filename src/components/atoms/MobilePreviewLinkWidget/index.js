import React from 'react'
import PropTypes from 'prop-types'
import { LinkWrapper } from './styles'

const MobilePreviewLinkWidget = ({ link, isWithImage }) => {
  return (
    <LinkWrapper isWithImage={isWithImage}>
      {link.image ? (
        <a href={link && link.url} rel='noopener noreferrer' target='_blank'>
          <img src={link.image} alt='Link' />
        </a>
      ) : (
        <>
          <img src='/barcode-scanner.png' alt='Barcode-scanner' />
          <a href={link && link.url} rel='noopener noreferrer' target='_blank'>
            {link && link.text}
          </a>
        </>
      )}
    </LinkWrapper>
  )
}

MobilePreviewLinkWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  link: PropTypes.object,
  isWithImage: PropTypes.bool
}

MobilePreviewLinkWidget.defaultProps = {
  link: null,
  isWithImage: false
}

export default MobilePreviewLinkWidget
