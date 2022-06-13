import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MobilePreviewBorderContainer from '../MobilePreviewBorderContainer'

const FollowFBMobileWrapper = styled.div`
  img {
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }
  a,
  a:hover {
    color: #354052;
  }
`

const MobilePreviewFollowFBWidget = ({ data }) => {
  return (
    <MobilePreviewBorderContainer>
      <FollowFBMobileWrapper>
        <img src='https://www.shping.com/static/media/fb.4811f932.svg' alt='facebook' />
        <a href={data.url} target='_blank' rel='noopener noreferrer'>
          {data.text}
        </a>
      </FollowFBMobileWrapper>
    </MobilePreviewBorderContainer>
  )
}

MobilePreviewFollowFBWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object
}

MobilePreviewFollowFBWidget.defaultProps = {
  data: null
}

export default MobilePreviewFollowFBWidget
