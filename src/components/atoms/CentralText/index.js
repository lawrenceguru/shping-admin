import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  line-height: 1.5;
  color: #d8d8d8;
  font-weight: 600;
`

const CentralText = ({ text }) => {
  return <TextWrapper>{text}</TextWrapper>
}

CentralText.propTypes = {
  text: PropTypes.string.isRequired
}

export default React.memo(CentralText)
