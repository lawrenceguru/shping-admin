import React from 'react'
import PropTypes from 'prop-types'
import { CertificateImage } from './styles'

const MobilePreviewCertificatesWidget = ({ sourceWidgets }) => {
  const getProductsCertificates = () => {
    const allCertificates = []
    const allCertificatesImages = []
    sourceWidgets.forEach(el => {
      if (Object.keys(el).includes('certificates')) {
        allCertificates.push(el.certificates)
      }
    })
    allCertificates.forEach(el => {
      if (el.certificates && el.certificates.list && el.certificates.list.length) {
        el.certificates.list.forEach(elem => {
          allCertificatesImages.push(elem.img_url)
        })
      }
    })
    return allCertificatesImages
  }

  return (
    // eslint-disable-next-line react/no-array-index-key
    <div>{sourceWidgets ? getProductsCertificates().map((el, i) => <CertificateImage src={el} key={i} />) : null}</div>
  )
}

MobilePreviewCertificatesWidget.propTypes = {
  sourceWidgets: PropTypes.arrayOf(PropTypes.object)
}

MobilePreviewCertificatesWidget.defaultProps = {
  sourceWidgets: null
}

export default MobilePreviewCertificatesWidget
