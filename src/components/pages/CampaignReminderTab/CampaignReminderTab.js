import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import SwitchOption from '../../atoms/SwitchOption'
import * as ST from './styles'
import { formatDateTime } from '../../../utils/helpers/date'
import Button from '../../atoms/Button'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import Loader from '../../templates/Loader'
import Table from '../../molecules/Table'

const CampaignReminderTab = ({
  history,
  isLoadingReminders,
  reminders,
  isActivatedReminder,
  rewardsCampaignReminderStatusToggle,
  rewardsGetCampaignReminders
}) => {
  const columns = [
    {
      key: 'switch',
      align: 'center',
      render: data => (
        <ST.SwitchFieldWrapper>
          <SwitchOption
            checked={data.status.toLowerCase() === 'active'}
            onChange={(value, event) => {
              event.preventDefault()
              event.stopPropagation()
              rewardsCampaignReminderStatusToggle({
                id: data.id,
                status: value ? 'active' : 'inactive',
                name: data.name
              })
            }}
          />
        </ST.SwitchFieldWrapper>
      )
    },
    {
      key: 'name',
      dataIndex: 'name',
      align: 'center',
      title: intl.get('campaigns.reminder.bodyTab1.tableHeader1')
    },
    {
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      title: intl.get('campaigns.reminder.bodyTab1.tableHeader2')
    },
    {
      key: 'startDate',
      dataIndex: 'startDate',
      align: 'center',
      title: intl.get('campaigns.reminder.bodyTab1.tableHeader3')
    }
  ]

  useEffect(() => {
    if (!isLoadingReminders) {
      rewardsGetCampaignReminders()
    }
  }, [])

  const [localReminders, setLocalReminders] = useState([])
  const [paginationSize, setPaginationSize] = useState(10)
  const totalCount = useMemo(() => (localReminders && localReminders.length) || 0, [localReminders])
  const optionsForSort = useMemo(() => {
    return columns && columns.length ? columns.filter(option => option.key !== 'switch') : []
  }, [columns])

  const getLocalReminders = useCallback(serverReminders => {
    return serverReminders && serverReminders.length
      ? serverReminders.map(item => {
          return {
            id: item.id,
            key: item.id,
            name: item.name || '-',
            status: (item.status && item.status[0].toUpperCase() + item.status.slice(1)) || '-',
            startDate:
              (item.run_options &&
                formatDateTime(`${item.run_options.start_date} ${item.run_options.start_time}`, {
                  parseFormat: 'yyyy-MM-dd HH:mm:ss'
                })) ||
              '-'
          }
        })
      : []
  }, [])

  useEffect(() => {
    setLocalReminders(getLocalReminders(reminders))
  }, [reminders])

  const setDefaultSort = useCallback(() => {
    setLocalReminders(getLocalReminders(reminders))
  }, [reminders])

  const onRowClick = useCallback(
    record => {
      history.push(`/admin/campaigns/reminder/${record.id}`)
    },
    [history]
  )

  const handleAddBoost = useCallback(() => history.push('/admin/campaigns/reminder/new-reminder'), [])

  return (
    <ST.Wrapper>
      <ST.ButtonWrapper>
        <Button type='danger' size='large' onClick={handleAddBoost}>
          {intl.get('campaigns.reminder.buttonCreate')}
        </Button>
      </ST.ButtonWrapper>
      <TableHeaderOptions
        totalItems={totalCount}
        itemsForSort={localReminders}
        setCurrItemsForSort={sortedReminders => setLocalReminders(sortedReminders)}
        paginationSize={paginationSize}
        handleChangePaginationSize={size => setPaginationSize(size)}
        setDefaultSort={setDefaultSort}
        optionsForSort={optionsForSort}
      />
      {isLoadingReminders ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          rowKey='key'
          loading={isActivatedReminder}
          limit={paginationSize}
          totalCounts={totalCount}
          data={localReminders}
          onRowClick={onRowClick}
          pagination
          isNotRenderOnEmptyData
        />
      )}
    </ST.Wrapper>
  )
}

CampaignReminderTab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  isLoadingReminders: PropTypes.bool,
  reminders: PropTypes.arrayOf(PropTypes.object),
  isActivatedReminder: PropTypes.bool,
  rewardsCampaignReminderStatusToggle: PropTypes.func.isRequired,
  rewardsGetCampaignReminders: PropTypes.func.isRequired
}

CampaignReminderTab.defaultProps = {
  isLoadingReminders: false,
  reminders: null,
  isActivatedReminder: false
}

export default CampaignReminderTab
