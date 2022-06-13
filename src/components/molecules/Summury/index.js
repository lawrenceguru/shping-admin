import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const HeadingStyled = styled.div`
  margin-bottom: 30px;
  letter-spacing: 0;

  > svg {
    margin-right: 15px;
  }
  font-weight: 700;

  @media only screen and (max-height: 720px) {
    font-size: 15px;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  width: 100%;
`
const Container = styled.div`
  align-items: center;
  border-radius: 3px;
  padding: 25px;
  min-height: 550px;
  max-height: 550px;
  background-color: #ffffff;
  overflow-y: scroll;
  flex-basis: 30%;
  &::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }
  &::-webkit-scrollbar-track:hover {
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 5px solid #fff;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid #f4f4f4;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`
const ItemContainer = styled.div`
  justify-content: center;
  word-wrap: break-word;
  margin: 2px 0;
  ${({ isArray }) => isArray && { flexFlow: 'column' }};
`

const Section = styled.div`
  margin-bottom: 15px;
  ${({ isActive }) => isActive && 'color: rgb(239, 61, 70)'};
`

const Label = styled.span`
  display: block;
  font-weight: bold;
  margin-right: 5px;
  margin-bottom: 3px;
`
const renderItem = value => {
  if (typeof value === 'string') {
    return value
  }
  // eslint-disable-next-line react/no-array-index-key
  return Array.isArray(value) ? value.map((m, index) => <div key={`${m}.${index}`}>{m}</div>) : ''
}
const Item = ({ label, value }) => {
  return (
    <ItemContainer isArray={Array.isArray(value)}>
      <Label>{`${label}:`}</Label>
      {renderItem(value)}
    </ItemContainer>
  )
}

const Summary = ({ header, children }) => {
  return (
    <Wrapper>
      <Container>
        <HeadingStyled>{header}</HeadingStyled>
        {children}
      </Container>
    </Wrapper>
  )
}

Item.propTypes = {
  label: PropTypes.string
}

Item.defaultProps = {
  label: ''
}

Section.propTypes = {
  isActive: PropTypes.bool
}

Section.defaultProps = {
  isActive: false
}

Summary.propTypes = {
  header: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array
}

Summary.defaultProps = {
  header: '',
  children: []
}

export { Summary, Item, Label, Section }
