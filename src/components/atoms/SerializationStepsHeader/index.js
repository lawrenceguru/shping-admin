import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WrapperText = styled.div`
  margin: 30px 0;
`

const SerializationStepsHeader = ({ firstHeaderText, secondHeaderText }) => {
  return (
    <WrapperText>
      <h1>{firstHeaderText}</h1>
      <h2>{secondHeaderText}</h2>
    </WrapperText>
  )
}

SerializationStepsHeader.propTypes = {
  firstHeaderText: PropTypes.string,
  secondHeaderText: PropTypes.string
}

SerializationStepsHeader.defaultProps = {
  firstHeaderText: null,
  secondHeaderText: null
}

export default SerializationStepsHeader
