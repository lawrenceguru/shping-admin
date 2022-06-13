import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Route, Redirect } from 'react-router-dom'

import { fromIdentity } from 'store/selectors'

const PrivateRoute = ({
  whitelist,
  component,
  isSystem,
  isAuthenticated,
  redirect,
  render,
  children,
  isHaveSystem
}) => {
  const shouldRender = props => {
    const accessCheck = isAuthenticated

    if (whitelist.length > 0 && whitelist.indexOf('system') >= 0 && !isSystem) {
      return null
    }

    if (whitelist.length > 0 && whitelist.indexOf('haveSystem') >= 0 && !isHaveSystem) {
      return null
    }

    if (children) {
      return children
    }
    if (accessCheck) {
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

  return <Route {...(component || render ? { render: shouldRender } : { children: shouldRender })} />
}

PrivateRoute.propTypes = {
  whitelist: PropTypes.arrayOf(PropTypes.string),
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  isSystem: PropTypes.bool.isRequired,
  isHaveSystem: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  redirect: PropTypes.string,
  render: PropTypes.func,
  children: PropTypes.element
}

PrivateRoute.defaultProps = {
  whitelist: [],
  component: null,
  redirect: null,
  render: null,
  children: null
}

const mapStateToProps = state => ({
  isSystem: fromIdentity.isSystem(state),
  isHaveSystem: fromIdentity.isHaveSystem(state),
  isAuthenticated: fromIdentity.isAuthenticated(state)
})

const PrivateRouteContainer = withRouter(connect(mapStateToProps)(PrivateRoute))

export default PrivateRouteContainer
