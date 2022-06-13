import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { fromSettings } from 'store/selectors'

const Wrapper = styled.div`
  height: 100vh;
`

const Header = styled.div`
  position: fixed;
  background: #fff;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 96px;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.1);
  z-index: 9;
  & > div:first-child {
    flex-basis: 14%;
  }
`

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100vh;
`

const MainTemplate = ({ children, header, logo, menu, ...props }) => {
  return (
    <Wrapper {...props}>
      <Header {...props}>
        {logo}
        {header}
      </Header>
      <Content {...props}>
        {menu}
        {children}
      </Content>
    </Wrapper>
  )
}

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  logo: PropTypes.node.isRequired,
  menu: PropTypes.node.isRequired
}

const mapStateToProps = state => ({
  sidebarWidth: fromSettings.sidebarWidthSelector(state)
})

export default connect(mapStateToProps)(MainTemplate)
