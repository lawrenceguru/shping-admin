import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as ST from './styles'
import CashbackSubmissionView from '../../organisms/CampaignCashbackSubmissionView'
import Loader from '../../templates/Loader'
import useCashbackSubmission from '../../../data/rewards/submission'

const CashbackCampaignSubmissionView = ({ match }) => {
  const { params } = match
  const { submission, mutate } = useCashbackSubmission(params.id)
  useEffect(() => {
    mutate()
  }, [])

  return (
    <ST.Wrapper>
      {submission ? (
        <>
          <CashbackSubmissionView submission={submission} id={params.id} />
        </>
      ) : (
        <Loader />
      )}
    </ST.Wrapper>
  )
}
CashbackCampaignSubmissionView.propTypes = {
  match: PropTypes.shape({})
}

CashbackCampaignSubmissionView.defaultProps = {
  match: {}
}

export default CashbackCampaignSubmissionView
