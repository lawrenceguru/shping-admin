import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { LoginForm } from 'containers'
import LandingTemplate from '../../templates/LandingTemplate'

const LoginPage = ({ match, identityGetSession }) => {
  const ticket = useMemo(() => {
    return match && match.params && match.params.token
  }, [match])

  useEffect(() => {
    if (ticket) {
      identityGetSession({ ticket, isNeedToGetAccount: true })
    }
  }, [ticket])
  return (
    <LandingTemplate>
      <LoginForm />
    </LandingTemplate>
  )
}

LoginPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  identityGetSession: PropTypes.func.isRequired
}

export default LoginPage
