import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../templates/Loader'
import { StyledContainer, AnalyticInformation } from './styles'

const PagesRoutingWrapper = ({ children }) => {
  return (
    <StyledContainer>
      <AnalyticInformation>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </AnalyticInformation>
    </StyledContainer>
  )
}

PagesRoutingWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default PagesRoutingWrapper
