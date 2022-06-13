import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './styles'

const TabPagesWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

TabPagesWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default TabPagesWrapper
