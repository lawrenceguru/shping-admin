import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { REWARDS_API } from 'constants/url'
import * as ST from './styles'
import CreateForm from '../../organisms/CampaignCashbackForm'
import Loader from '../../templates/Loader'
import useCashback from '../../../data/rewards/cashback'
// import useCashbacks from '../../../data/rewards/cashbacks'
import { update, publishUpdateAction } from '../../organisms/CampaignCashbackForm/actions'

const CampaignCashbackEditPage = ({ match }) => {
  const { params } = match
  const history = useHistory()
  const { cashback, mutate } = useCashback(params.id)
  const ticket = useSelector(({ identity }) => identity.ticket)
  const onFinish = data => {
    update(data, ticket, mutate)
  }
  const onPublished = data => {
    publishUpdateAction(data, ticket, history)
  }
  useEffect(() => {
    mutate([`${REWARDS_API}/cashbacks/submissions/get`, params.id])
  }, [])

  return (
    <ST.Wrapper>
      {typeof cashback === 'object' && !Array.isArray(cashback) ? (
        <CreateForm cashback={cashback} onFinish={onFinish} onPublished={onPublished} />
      ) : (
        <Loader />
      )}
    </ST.Wrapper>
  )
}

export default CampaignCashbackEditPage
