import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../templates/Loader'
import { StyledRedirectTabs } from './styles'

const RedirectTabs = ({ children }) => {
  return (
    <StyledRedirectTabs>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </StyledRedirectTabs>
  )
}

RedirectTabs.propTypes = {
  children: PropTypes.node
}

RedirectTabs.defaultProps = {
  children: null
}

export default RedirectTabs
