import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import moment from 'moment'
import { toast } from 'react-toastify'
import * as ST from './styles'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import Loader from '../../templates/Loader'
import Table from '../../molecules/Table'
import { formatDateTime } from '../../../utils/helpers/date'
import SwitchOption from '../../atoms/SwitchOption'
import Button from '../../atoms/Button'

const CampaignBoostTab = ({
  history,
  isLoadingBoosts,
  boosts,
  activatedBoostId,
  rewardsCampaignBoostStatusToggle,
  rewardsGetCampaignBoosts
}) => {
  const columns = [
    {
      key: 'switch',
      align: 'center',
      render: data => (
        <ST.SwitchFieldWrapper>
          <SwitchOption
            checked={data.status === 'active'}
            onChange={(value, event) => {
              event.preventDefault()
              event.stopPropagation()
              if (data.status !== 'active' && moment().diff(moment(data.endDate)) > 0) {
                toast.error(intl.get('campaigns.boost.expiredCampaignBoost'))
              } else {
                rewardsCampaignBoostStatusToggle({
                  id: data.id,
                  status: value ? 'active' : 'inactive',
                  name: data.name
                })
              }
            }}
          />
        </ST.SwitchFieldWrapper>
      )
    },
    {
      key: 'name',
      dataIndex: 'name',
      align: 'center',
      title: intl.get('campaigns.boost.bodyTab1.tableHeader1')
    },
    {
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      title: intl.get('campaigns.boost.bodyTab1.tableHeader2')
    },
    {
      key: 'startDate',
      dataIndex: 'startDate',
      align: 'center',
      title: intl.get('campaigns.boost.bodyTab1.tableHeader3')
    },
    {
      key: 'endDate',
      dataIndex: 'endDate',
      align: 'center',
      title: intl.get('campaigns.boost.bodyTab1.tableHeader4')
    }
  ]

  useEffect(() => {
    if (!isLoadingBoosts) {
      rewardsGetCampaignBoosts()
    }
  }, [])

  const [localBoosts, setLocalBoosts] = useState([])
  const [paginationSize, setPaginationSize] = useState(10)
  const totalCount = useMemo(() => (localBoosts && localBoosts.length) || 0, [localBoosts])
  const optionsForSort = useMemo(() => {
    return columns && columns.length ? columns.filter(option => option.key !== 'switch') : []
  }, [columns])

  const getLocalBoosts = useCallback(serverBoosts => {
    return serverBoosts && serverBoosts.length
      ? serverBoosts.map(item => {
          return {
            id: item.id,
            key: item.id,
            name: item.name || '-',
            status: item.status || '-',
            startDate: (item.start_date && formatDateTime(item.start_date, { outputFormat: 'M/d/yyyy' }, true)) || '-',
            endDate: (item.end_date && formatDateTime(item.end_date, { outputFormat: 'M/d/yyyy' }, true)) || '-'
          }
        })
      : []
  }, [])

  useEffect(() => {
    setLocalBoosts(getLocalBoosts(boosts))
  }, [boosts])

  const setDefaultSort = useCallback(() => {
    setLocalBoosts(getLocalBoosts(boosts))
  }, [boosts])

  const onRowClick = useCallback(
    record => {
      history.push(`/admin/campaigns/boost/${record.id}`)
    },
    [history]
  )

  const handleAddBoost = useCallback(() => history.push('/admin/campaigns/boost/new-boost'), [])
  return (
    <ST.Wrapper>
      <ST.ButtonWrapper>
        <Button type='danger' size='large' onClick={handleAddBoost}>
          {intl.get('campaigns.boost.buttonCreate')}
        </Button>
      </ST.ButtonWrapper>
      <TableHeaderOptions
        totalItems={totalCount}
        itemsForSort={localBoosts}
        setCurrItemsForSort={sortedBoosts => setLocalBoosts(sortedBoosts)}
        paginationSize={paginationSize}
        handleChangePaginationSize={size => setPaginationSize(size)}
        setDefaultSort={setDefaultSort}
        optionsForSort={optionsForSort}
      />
      {isLoadingBoosts ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          rowKey='key'
          loading={!!activatedBoostId}
          limit={paginationSize}
          totalCounts={totalCount}
          data={localBoosts}
          onRowClick={onRowClick}
          pagination
          isNotRenderOnEmptyData
        />
      )}
    </ST.Wrapper>
  )
}

CampaignBoostTab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  isLoadingBoosts: PropTypes.bool,
  boosts: PropTypes.arrayOf(PropTypes.object),
  activatedBoostId: PropTypes.string,
  rewardsCampaignBoostStatusToggle: PropTypes.func.isRequired,
  rewardsGetCampaignBoosts: PropTypes.func.isRequired
}

CampaignBoostTab.defaultProps = {
  isLoadingBoosts: false,
  boosts: null,
  activatedBoostId: null
}

export default CampaignBoostTab
