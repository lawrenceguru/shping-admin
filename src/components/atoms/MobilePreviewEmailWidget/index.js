import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../molecules/IconButton'
import MobilePreviewBorderContainer from '../MobilePreviewBorderContainer'

const MobilePreviewEmailWidget = ({ data }) => {
  return (
    <MobilePreviewBorderContainer>
      <IconButton type='Email' styleParam={{ fontSize: 18, marginRight: 10, cursor: 'default' }} />
      {data.text}
    </MobilePreviewBorderContainer>
  )
}

MobilePreviewEmailWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object
}

MobilePreviewEmailWidget.defaultProps = {
  data: null
}

export default MobilePreviewEmailWidget
