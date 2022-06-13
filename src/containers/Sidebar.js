import React from 'react'
import { connect } from 'react-redux'
import { identityDeleteSession } from 'store/actions'
import { fromSettings } from 'store/selectors'
import Sidebar from '../components/organisms/Sidebar'

const SidebarContainer = props => <Sidebar {...props} />

const mapStateToProps = state => ({
  isSidebarOpen: fromSettings.isSidebarOpen(state),
  identity: state.identity
})

export default connect(mapStateToProps, { identityDeleteSession })(SidebarContainer)
