import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Route, Redirect } from 'react-router-dom'

import { fromIdentity } from 'store/selectors'

const UnprivateRoute = ({ path, whitelist, component, isSystem, isAuthenticated, redirect, render, children }) => {
  const shouldRender = props => {
    const accessCheck = isAuthenticated

    if (whitelist.length > 0 && whitelist.indexOf('system') >= 0 && !isSystem) {
      return null
    }

    if (children) {
      return children
    }
    if (!accessCheck) {
      if (component || render) {
        if (component) return React.createElement(component, props)
        if (render) return render(props)
        return null
      }
      if (children) return children(props)
    }

    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: redirect
          }}
        />
      )
    }

    return null
  }

  return (
    <Route {...(path && { path })} {...(component || render ? { render: shouldRender } : { children: shouldRender })} />
  )
}

UnprivateRoute.propTypes = {
  whitelist: PropTypes.arrayOf(PropTypes.string),
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isSystem: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  redirect: PropTypes.string,
  render: PropTypes.func,
  children: PropTypes.element,
  path: PropTypes.string
}

UnprivateRoute.defaultProps = {
  whitelist: [],
  component: null,
  redirect: null,
  render: null,
  children: null,
  path: null
}

const mapStateToProps = state => ({
  isSystem: fromIdentity.isSystem(state),
  isAuthenticated: fromIdentity.isAuthenticated(state)
})

export default withRouter(connect(mapStateToProps)(UnprivateRoute))
