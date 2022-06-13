import React from 'react'
import { connect } from 'react-redux'
import { settingsSetSidebarWidth } from 'store/actions'
import { fromSettings } from 'store/selectors'
import Logo from '../components/molecules/Logo'

const LogoContainer = props => {
  return <Logo {...props} />
}

const mapStateToProps = state => ({
  defaultSidebarWidth: fromSettings.defaultSidebarWidthSelector(state),
  sidebarWidth: fromSettings.sidebarWidthSelector(state)
})

export default connect(mapStateToProps, { settingsSetSidebarWidth })(LogoContainer)
