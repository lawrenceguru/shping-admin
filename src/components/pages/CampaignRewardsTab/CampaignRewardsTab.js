import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import * as ST from './styles'
import CampaignsRewardsGraph from '../../organisms/CampaignsRewardsGraph'
import CustomTable from '../../molecules/Table'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import Loader from '../../templates/Loader'
import IconButton from '../../molecules/IconButton'
import SwitchOption from '../../atoms/SwitchOption'
import { convertFromUint256 } from '../../../utils/helpers/mathOperations'
import { formatDateTime } from '../../../utils/helpers/date'
import FilterPanel from '../../molecules/FilterPanel'
import { optionsForFilters, defaultInitialStateFilters } from './consts'
import { nameType } from '../../../utils/consts'
import Button from '../../atoms/Button'
import { getFiltersForRequest } from '../../../utils/campaign'
import deleteModal from '../../molecules/DeleteModal'

const CampaignRewardsTab = ({
  campaigns,
  rewardsGetCampaigns,
  rewardsDeleteCampaign,
  rewardsPutStatusOfCampaign,
  isLoadingCampaigns,
  isDeleting,
  rewardsActions,
  settingsGetRewardsActions,
  isLoadingActions,
  isLoadingActivation,
  indicators,
  history,
  analyticsGetRewardsIndicators,
  rewardsDuplicateCampaign
}) => {
  const [filters, setFilters] = useState({})
  const [paginationSize, setPaginationSize] = useState(10)
  const [localCampaigns, setLocalCampaigns] = useState([])
  const columns = [
    {
      title: intl.get('campaigns.rewards.bodyTab1.tableHeader1'),
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: intl.get('campaigns.rewards.bodyTab1.tableHeader2'),
      key: 'status',
      align: 'center',
      render: data => (
        <SwitchOption
          checked={data.status === 'active'}
          onChange={(value, event) => {
            event.preventDefault()
            event.stopPropagation()
            rewardsPutStatusOfCampaign({ id: data.id, status: value ? 'active' : 'inactive' })
          }}
        />
      )
    },
    {
      title: intl.get('campaigns.rewards.bodyTab1.tableHeader6'),
      dataIndex: 'spent',
      key: 'spent',
      align: 'center'
    },
    {
      title: intl.get('campaigns.rewards.bodyTab1.tableHeader3'),
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center'
    },
    {
      title: intl.get('campaigns.rewards.bodyTab1.tableHeader4'),
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center'
    },
    {
      key: 'delete',
      align: 'center',
      render: data =>
        data.status !== 'active' && (
          <IconButton
            type='Delete'
            actionFunction={event => {
              event.preventDefault()
              event.stopPropagation()
              deleteModal(
                () => rewardsDeleteCampaign(data.id),
                intl.get('campaigns.rewards.deleteMessage', { name: data.name })
              )
            }}
          />
        )
    },
    {
      key: 'copy',
      align: 'center',
      render: data => (
        <IconButton
          type='Copy'
          actionFunction={event => {
            event.preventDefault()
            event.stopPropagation()
            rewardsDuplicateCampaign(data.id)
            history.push('/admin/campaigns/rewards/new-campaign')
          }}
        />
      )
    }
  ]

  const rate = useMemo(() => {
    let result = '0%'
    if (indicators) {
      const { issued, impressions } = indicators
      const expressionResult = issued && (impressions / issued) * 100
      result =
        (expressionResult &&
          Number.isFinite(expressionResult) &&
          `${expressionResult % 1 ? expressionResult.toFixed(2) : expressionResult}%`) ||
        result
    }
    return result
  }, [indicators])

  const rewardsActionsOptions = useMemo(
    () =>
      rewardsActions && rewardsActions.length
        ? rewardsActions.map(action => ({
            value: action.id,
            label: action[nameType]
          }))
        : [],
    [rewardsActions, nameType]
  )

  const fieldsForMainPanelAdvanced = useMemo(() => {
    return [
      {
        fieldId: 'dates',
        type: 'rangePicker',
        columnName: 'Range Picker',
        format: 'YYYY-MM-DD'
      },
      {
        fieldId: 'action',
        placeholder: intl.get('campaigns.rewards.filters.actionPlaceholder'),
        type: 'select',
        columnName: intl.get('campaigns.rewards.filters.action'),
        options: rewardsActionsOptions
      }
    ]
  }, [rewardsActionsOptions])

  const totalItems = useMemo(() => {
    return (campaigns && campaigns.length) || 0
  }, [campaigns])

  const optionsForSort = useMemo(() => {
    return columns && columns.length ? columns.filter(option => !['delete', 'copy'].includes(option.key)) : []
  }, [columns])

  const getLocalCampaigns = useCallback(() => {
    const data =
      campaigns && campaigns.length
        ? campaigns.map(campaign => ({
            id: campaign.id,
            key: campaign.id,
            name: campaign.name,
            status: campaign.status,
            spent:
              (campaign.spendings &&
                campaign.spendings.overall &&
                campaign.spendings.overall.coins &&
                Math.floor(convertFromUint256(campaign.spendings.overall.coins))) ||
              0,
            startDate: (campaign.start_date && formatDateTime(campaign.start_date)) || '-',
            endDate: (campaign.end_date && formatDateTime(campaign.end_date)) || '-'
          }))
        : []
    setLocalCampaigns(data)
  }, [campaigns])

  useEffect(() => {
    getLocalCampaigns()
  }, [campaigns, getLocalCampaigns])

  useEffect(() => {
    if (!isLoadingCampaigns) {
      const request = getFiltersForRequest(filters)
      rewardsGetCampaigns(request)
    }
    const request = getFiltersForRequest(filters, 'indicators')
    analyticsGetRewardsIndicators(request)

    if (!isLoadingActions) {
      settingsGetRewardsActions()
    }
  }, [])

  const handleFilterCampaigns = useCallback(userFilters => {
    setFilters(userFilters)
    const requestCampaign = getFiltersForRequest(userFilters)
    rewardsGetCampaigns(requestCampaign)

    const requestIndicators = getFiltersForRequest(userFilters, 'indicators')
    analyticsGetRewardsIndicators(requestIndicators)
  }, [])

  const handleAddCampaign = useCallback(() => {
    history.push('/admin/campaigns/rewards/new-campaign')
  }, [history])

  const onRowClick = useCallback(
    record => {
      history.push(`/admin/campaigns/rewards/${record.id}`)
    },
    [history]
  )

  const setDefaultSort = useCallback(() => {
    getLocalCampaigns()
  }, [getLocalCampaigns])

  return (
    <ST.Wrapper>
      <CampaignsRewardsGraph rewardsActionsOptions={rewardsActionsOptions} />
      <ST.Header>{intl.get('campaigns.rewards.valueIndicators.header')}</ST.Header>
      <ST.RewardsIndicatorsPanel>
        <ST.RewardsIndicator>
          <h3>{intl.get('campaigns.rewards.valueIndicators.valueLabel1')}</h3>
          <span>{(indicators && indicators.impressions) || 0}</span>
        </ST.RewardsIndicator>
        <ST.RewardsIndicator>
          <h3>{intl.get('campaigns.rewards.valueIndicators.valueLabel2')}</h3>
          <span>{(indicators && indicators.issued) || 0}</span>
        </ST.RewardsIndicator>
        <ST.RewardsIndicator>
          <h3>{intl.get('campaigns.rewards.valueIndicators.valueLabel3')}</h3>
          <span>{rate}</span>
        </ST.RewardsIndicator>
        <ST.RewardsIndicator>
          <h3>{intl.get('campaigns.rewards.valueIndicators.valueLabel4')}</h3>
          <span>{(indicators && indicators.coins && Math.floor(indicators.coins)) || 0}</span>
        </ST.RewardsIndicator>
      </ST.RewardsIndicatorsPanel>
      <ST.FilterPanelWrapper count={(fieldsForMainPanelAdvanced && fieldsForMainPanelAdvanced.length) || 0}>
        <FilterPanel
          isAdvanced
          fieldsForMainPanelAdvanced={fieldsForMainPanelAdvanced}
          columnsData={optionsForFilters}
          noEquals
          handleFilterProducts={handleFilterCampaigns}
          defaultInitialState={defaultInitialStateFilters}
        >
          <ST.ButtonWrapper>
            <Button type='danger' size='large' onClick={handleAddCampaign}>
              {intl.get('campaigns.rewards.buttonCreate')}
            </Button>
          </ST.ButtonWrapper>
        </FilterPanel>
      </ST.FilterPanelWrapper>
      <TableHeaderOptions
        totalItems={totalItems}
        itemsForSort={localCampaigns}
        setCurrItemsForSort={sortedCampaigns => setLocalCampaigns(sortedCampaigns)}
        paginationSize={paginationSize}
        handleChangePaginationSize={size => setPaginationSize(size)}
        setDefaultSort={setDefaultSort}
        optionsForSort={optionsForSort}
      />
      {isLoadingCampaigns ? (
        <Loader style={{ position: 'relative' }} />
      ) : (
        <CustomTable
          columns={columns}
          rowKey='key'
          loading={isDeleting || isLoadingActivation}
          limit={paginationSize}
          totalCounts={totalItems}
          data={localCampaigns}
          onRowClick={onRowClick}
          pagination
          isNotRenderOnEmptyData
        />
      )}
    </ST.Wrapper>
  )
}

CampaignRewardsTab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  indicators: PropTypes.object,
  campaigns: PropTypes.arrayOf(PropTypes.object),
  rewardsGetCampaigns: PropTypes.func.isRequired,
  rewardsDeleteCampaign: PropTypes.func.isRequired,
  rewardsPutStatusOfCampaign: PropTypes.func.isRequired,
  isLoadingCampaigns: PropTypes.bool,
  isDeleting: PropTypes.bool,
  rewardsActions: PropTypes.arrayOf(PropTypes.object),
  settingsGetRewardsActions: PropTypes.func.isRequired,
  isLoadingActions: PropTypes.bool,
  isLoadingActivation: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  analyticsGetRewardsIndicators: PropTypes.func.isRequired,
  rewardsDuplicateCampaign: PropTypes.func.isRequired
}

CampaignRewardsTab.defaultProps = {
  indicators: null,
  campaigns: null,
  isLoadingCampaigns: false,
  isDeleting: false,
  rewardsActions: null,
  isLoadingActions: false,
  isLoadingActivation: false
}

export default withRouter(CampaignRewardsTab)
