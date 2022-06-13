import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import * as ST from './styles'
import CreateForm from '../../organisms/CampaignCashbackForm'
import { create, publishCreateAction } from '../../organisms/CampaignCashbackForm/actions'

const CampaignCashbackCreatePage = () => {
  const ticket = useSelector(({ identity }) => identity.ticket)
  const history = useHistory()
  const onFinish = data => {
    create(data, ticket, history)
  }
  const onPublished = data => {
    publishCreateAction(data, ticket, history)
  }
  return (
    <ST.Wrapper>
      <CreateForm onFinish={onFinish} onPublished={onPublished} />
    </ST.Wrapper>
  )
}

export default CampaignCashbackCreatePage
