import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from 'antd'
import LanguageSelector from '../../molecules/LanguageSelector'

import logo from '../../../assets/shping_logo.svg'

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  justify-items: center;
  grid-template-rows: 1fr 1fr;
`
const Content = styled.section`
  max-width: 920px;
  width: 350px
  position: absolute;
  top: 25%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`
const MainContainer = styled.div`
  height: 70vh;
  width: 100%;
  position: relative;
`

const StyledLogo = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  & > img {
    width: 120px;
    height: 40px;
    display: block;
    margin: 20px 50px;
  }
  @media (max-width: 1024px) {
    & > img {
      margin: 20px 30px;
    }
  }
`

const StyledNavBorder = styled.div`
  position: absolute;
  top: 85px;
  left: 0;
  height: 48px;
  width: 100%;
  background: url(/cover-top.svg) center repeat-x;
  @media (max-width: 1024px) {
    background: url(/cover-top.svg) left top repeat-x;
    background-size: cover;
  }
`

const LandingTemplate = ({ children, ...props }) => {
  /* eslint-disable global-require */
  return (
    <Wrapper {...props}>
      <StyledLogo>
        <img src={logo} alt='logo' height='128px' />
        <LanguageSelector />
      </StyledLogo>
      <StyledNavBorder />
      <MainContainer>
        <Content>{children}</Content>
      </MainContainer>
      <Typography.Text style={{ marginTop: -100, color: '#B2B3B2', fontSize: 14, fontWeight: 500 }} strong>
        &copy; {new Date().getUTCFullYear()} - Shping
      </Typography.Text>
    </Wrapper>
  )
  /* eslint-enable global-require */
}

LandingTemplate.propTypes = {
  children: PropTypes.node.isRequired
}

export default LandingTemplate
