import React, { useEffect, useMemo, useCallback } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import { getDetailsReportFromRequest } from '../../../utils/campaign'
import Table from '../../molecules/Table'
import * as columns from './consts'
import Button from '../../atoms/Button'

const CampaignSummaryReportsShowForm = ({
  history,
  match,
  campaignsGetDetailsForSummaryReports,
  details,
  isLoading
}) => {
  const id = useMemo(() => {
    return (match && match.params && match.params.id) || null
  }, [match])

  const data = useMemo(() => {
    return getDetailsReportFromRequest(details)
  }, [details])
  console.log(data)
  useEffect(() => {
    if (id) {
      campaignsGetDetailsForSummaryReports(id)
    }
  }, [id])

  const handelCancel = useCallback(() => {
    history.push('/admin/campaigns/summary-reports')
  }, [history])

  return (
    <ST.Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ST.Header style={{ marginTop: 0 }}>{intl.get('campaigns.tabs.summary')}</ST.Header>
          <ST.RewardsIndicatorsPanel>
            <ST.RewardsIndicator>
              <h3>{intl.get('campaigns.summaryReports.scans.total')}</h3>
              <span>{(data && data.scans && data.scans.total_scans) || 0}</span>
            </ST.RewardsIndicator>
            <ST.RewardsIndicator>
              <h3>{intl.get('campaigns.summaryReports.scans.unique')}</h3>
              <span>{(data && data.scans && data.scans.total_unique_users_who_made_scan) || 0}</span>
            </ST.RewardsIndicator>
            <ST.RewardsIndicator>
              <h3>{intl.get('campaigns.summaryReports.scans.authorized')}</h3>
              <span>{(data && data.scans && data.scans.total_authorised_scans) || 0}</span>
            </ST.RewardsIndicator>
          </ST.RewardsIndicatorsPanel>
          <ST.Header>
            {intl.get('campaigns.summaryReports.socialMedia.title', { count: data.countSocialMedia || '0' })}
          </ST.Header>
          <Table columns={columns.socialMedia} data={(data.data && data.data.socialMedia) || []} rowKey='id' noScroll />
          <ST.Header>{intl.get('campaigns.summaryReports.video.title', { count: data.countVideos || '0' })}</ST.Header>
          <Table columns={columns.video} data={(data.data && data.data.videos) || []} rowKey='id' noScroll />
          <ST.Header>{intl.get('campaigns.summaryReports.links.title', { count: data.countLinks || '0' })}</ST.Header>
          <Table columns={columns.links} data={(data.data && data.data.links) || []} rowKey='id' noScroll />
          <ST.ButtonWrapper>
            <Button size='large' onClick={handelCancel}>
              {intl.get('common.back')}
            </Button>
          </ST.ButtonWrapper>
        </>
      )}
    </ST.Wrapper>
  )
}

CampaignSummaryReportsShowForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  campaignsGetDetailsForSummaryReports: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  details: PropTypes.object,
  isLoading: PropTypes.bool
}
CampaignSummaryReportsShowForm.defaultProps = {
  details: null,
  isLoading: false
}

export default CampaignSummaryReportsShowForm
