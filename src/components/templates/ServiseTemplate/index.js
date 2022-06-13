import React from 'react'
import { Logo, Sidebar } from 'containers'
import PropTypes from 'prop-types'
import Navigation from '../../organisms/Navigation'
import MainTemplate from '../MainTemplate'
import { Wrapper } from './styles'

const logo = <Logo />
const Header = <Navigation />
const Menu = <Sidebar />

const ServicePage = ({ children }) => {
  return (
    <MainTemplate header={Header} logo={logo} menu={Menu}>
      <Wrapper> {children} </Wrapper>
    </MainTemplate>
  )
}

ServicePage.propTypes = {
  children: PropTypes.node.isRequired
}

export default ServicePage
