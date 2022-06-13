import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as ST from './styles'
import CashbackView from '../../organisms/CampaignCashbackView'
import CashbackUserSubmissions from '../../organisms/CampaignCashbackUserSubmissions'
import Loader from '../../templates/Loader'
import useCashback from '../../../data/rewards/cashback'

const CashbackCampaignView = ({ match }) => {
  const { params } = match
  const { cashback, mutate } = useCashback(params.id)
  useEffect(() => {
    mutate()
  }, [])

  return (
    <ST.Wrapper>
      {cashback ? (
        <>
          <CashbackView cashback={cashback} />
        </>
      ) : (
        <Loader />
      )}
      <CashbackUserSubmissions cashback={params.id} />
    </ST.Wrapper>
  )
}
CashbackCampaignView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object
}

CashbackCampaignView.defaultProps = {
  match: {}
}

export default CashbackCampaignView
