import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import logo from 'assets/logo.png'
import Wrapper from './styles'

const Logo = ({ defaultSidebarWidth, settingsSetSidebarWidth, sidebarWidth }) => {
  useEffect(() => {
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100)
  }, [sidebarWidth])
  const toggleNav = () => {
    if (sidebarWidth === defaultSidebarWidth) {
      settingsSetSidebarWidth(1)
    } else {
      settingsSetSidebarWidth(defaultSidebarWidth)
    }
  }

  return (
    <Wrapper onClick={toggleNav}>
      <img src={logo} alt='logo' />
      {sidebarWidth === 1 ? (
        <Icon type='menu' style={{ fontSize: 14 }} />
      ) : (
        <Icon type='close' style={{ fontSize: 14 }} />
      )}
    </Wrapper>
  )
}

Logo.propTypes = {
  defaultSidebarWidth: PropTypes.number.isRequired,
  settingsSetSidebarWidth: PropTypes.func.isRequired,
  sidebarWidth: PropTypes.number.isRequired
}

export default Logo
