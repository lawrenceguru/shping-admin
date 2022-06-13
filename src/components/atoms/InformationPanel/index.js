import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from '../../molecules/IconButton'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-basis: 88%;
  flex-direction: column;
`

const IconWrapper = styled.div`
  display: flex;
  flex-basis: 10%;
  justify-content: center;
  & > div {
    display: flex;
    align-items: start;
  }
`

const Header = styled.h2`
  margin-top: 0;
  line-height: 1;
  font-weight: 900;
  font-size: 20px;
`
const Content = styled.span`
  font-size: 15px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
`

const InformationPanel = ({ header, content }) => {
  return (
    <Wrapper>
      <IconWrapper>
        <IconButton type='InfoCircle' styleParam={{ color: '#ff4d4f', cursor: 'default' }} />
      </IconWrapper>
      <ContentWrapper>
        <Header>{header}</Header>
        <Content>{content}</Content>
      </ContentWrapper>
    </Wrapper>
  )
}

InformationPanel.propTypes = {
  header: PropTypes.string,
  content: PropTypes.string
}

InformationPanel.defaultProps = {
  header: null,
  content: null
}

export default InformationPanel
