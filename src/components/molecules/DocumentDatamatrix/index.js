import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Datamatrix from '../../atoms/Datamatrix'

const Wrapper = styled.div`
  margin-left: auto;
  margin-bottom: 30px;
`

const DatamatrixWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 277px;
  & canvas {
    display: block;
    width: 150px;
    height: 150px;
    margin-top: 30px;
  }
`

const DocumentDatamatrix = ({ code, id, bcid }) => {
  return (
    <Wrapper>
      <DatamatrixWrapper>
        <Datamatrix code={code} id={id} bcid={bcid} />
      </DatamatrixWrapper>
    </Wrapper>
  )
}

DocumentDatamatrix.propTypes = {
  code: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  bcid: PropTypes.string
}

DocumentDatamatrix.defaultProps = {
  bcid: null
}

export default DocumentDatamatrix
