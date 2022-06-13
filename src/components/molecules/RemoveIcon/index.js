import React from 'react'
import { CloseOutlined } from '@ant-design/icons'

import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledIconRemove = styled.div`
  color: #b3b3b3;
  font-size: 14px;
`

const RemoveIcon = ({ setItem }) => {
  return (
    <StyledIconRemove>
      <CloseOutlined onClick={() => setItem()} />
    </StyledIconRemove>
  )
}

RemoveIcon.propTypes = {
  setItem: PropTypes.func.isRequired
}

export default RemoveIcon
