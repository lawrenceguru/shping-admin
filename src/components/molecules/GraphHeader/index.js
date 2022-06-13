import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import RemoveIcon from '../RemoveIcon'

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 15px 15px 11px 40px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
`

const Header = styled.div`
  font-weight: bold;
  color: black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 1rem;
  background: #fff;
`

const GraphHeader = ({ name, setItem, isHaveRemoverIcon }) => {
  return (
    <HeaderBlock>
      <Header className='header-block'>{name}</Header>
      {isHaveRemoverIcon && <RemoveIcon widgetName={name} setItem={setItem} />}
    </HeaderBlock>
  )
}

GraphHeader.propTypes = {
  name: PropTypes.string.isRequired,
  setItem: PropTypes.func,
  isHaveRemoverIcon: PropTypes.bool
}

GraphHeader.defaultProps = {
  setItem: null,
  isHaveRemoverIcon: true
}

export default GraphHeader
