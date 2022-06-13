import React from 'react'
import { Spin, Icon } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const SpinWrapper = styled(Spin)`
  color: rgb(178, 179, 178);
`

const LoadingSpinner = ({ isLoading, children }) => {
  const antIcon = <Icon type='loading' style={{ fontSize: 40 }} spin />
  return (
    <SpinWrapper indicator={antIcon} tip='Loading...' spinning={isLoading}>
      {children}
    </SpinWrapper>
  )
}

LoadingSpinner.propTypes = {
  // postUpload: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.node
}

LoadingSpinner.defaultProps = {
  isLoading: false,
  children: false
}

export default LoadingSpinner
