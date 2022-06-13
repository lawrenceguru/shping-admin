import React from 'react'
import PropTypes from 'prop-types'
import { StyledContainerUserInfo, StyledUserImage, StyledUserName } from './styles'

const UserInfo = ({ image, firstName, styles }) => {
  return (
    <StyledContainerUserInfo style={styles}>
      <div>
        <StyledUserImage style={styles} src={image || '/no-image-user.png'} alt='User' />
      </div>
      {firstName && (
        <StyledUserName>
          <span>{firstName || 'Unknown'}</span>
        </StyledUserName>
      )}
    </StyledContainerUserInfo>
  )
}

UserInfo.propTypes = {
  image: PropTypes.string,
  firstName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // eslint-disable-next-line react/forbid-prop-types
  styles: PropTypes.object
}

UserInfo.defaultProps = {
  image: null,
  firstName: null,
  styles: {}
}
export default UserInfo
