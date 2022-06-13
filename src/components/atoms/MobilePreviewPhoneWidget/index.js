import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../molecules/IconButton'
import MobilePreviewBorderContainer from '../MobilePreviewBorderContainer'

const MobilePreviewPhoneWidget = ({ data }) => {
  return (
    <MobilePreviewBorderContainer>
      <IconButton type='PhoneVolume' styleParam={{ fontSize: 18, marginRight: 10, cursor: 'default' }} />
      {data.text}
    </MobilePreviewBorderContainer>
  )
}

MobilePreviewPhoneWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object
}

MobilePreviewPhoneWidget.defaultProps = {
  data: null
}

export default MobilePreviewPhoneWidget
