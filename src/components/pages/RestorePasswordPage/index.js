import React from 'react'
import { RestorePasswordForm } from 'containers'
import LandingTemplate from '../../templates/LandingTemplate'

const RestoreSendEmailPage = ({ match }) => {
  return (
    <LandingTemplate>
      <RestorePasswordForm code={match.params.code} />
    </LandingTemplate>
  )
}

export default RestoreSendEmailPage
