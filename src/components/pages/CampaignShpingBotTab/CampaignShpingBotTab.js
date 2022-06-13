import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import * as ST from './styles'
import Table from '../../molecules/Table'
import Loader from '../../templates/Loader'
import IconButton from '../../molecules/IconButton'
import { formatDateTime } from '../../../utils/helpers/date'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import FilterPanel from '../../molecules/FilterPanel'
import Button from '../../atoms/Button'
import { fieldsForMainPanelAdvanced, optionsForFilters, defaultInitialStateFilters } from './consts'
import deleteModal from '../../molecules/DeleteModal'

const CampaignShpingBotTab = ({
  rewardsDeleteCampaignBot,
  rewardsGetCampaignBots,
  bots,
  isLoadingBots,
  isBotDeleting,
  history,
  rewardsDuplicateCampaignBot
}) => {
  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      align: 'center',
      title: intl.get('campaigns.bot.tableHeader1')
    },
    {
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      title: intl.get('campaigns.bot.tableHeader2')
    },
    {
      key: 'points',
      dataIndex: 'points',
      align: 'center',
      title: intl.get('campaigns.bot.tableHeader3')
    },
    {
      key: 'startDate',
      dataIndex: 'startDate',
      align: 'center',
      title: intl.get('campaigns.bot.tableHeader4')
    },
    {
      key: 'endDate',
      dataIndex: 'endDate',
      align: 'center',
      title: intl.get('campaigns.bot.tableHeader5')
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
                () => rewardsDeleteCampaignBot(data.id),
                intl.get('campaigns.bot.deleteMessage', { name: data.name })
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
            rewardsDuplicateCampaignBot(data.id)
            history.push('/admin/campaigns/bot/new-bot')
          }}
        />
      )
    }
  ]

  const [localBots, setLocalBots] = useState([])
  const [paginationSize, setPaginationSize] = useState(10)
  const totalCount = useMemo(() => (localBots && localBots.length) || 0, [localBots])
  const optionsForSort = useMemo(() => {
    return columns && columns.length ? columns.filter(option => !['delete', 'copy'].includes(option.key)) : []
  }, [columns])

  useEffect(() => {
    if (!isLoadingBots) {
      rewardsGetCampaignBots()
    }
  }, [])

  const getLocalBots = useCallback(serverBots => {
    return serverBots && serverBots.length
      ? serverBots.map(item => {
          return {
            id: item.id,
            key: item.id,
            name: item.name || '-',
            status: item.status || '-',
            points: (item.products && item.products.length) || 0,
            startDate: (item.start_time && formatDateTime(item.start_time, { outputFormat: 'M/d/yyyy' }, true)) || '-',
            endDate: (item.end_time && formatDateTime(item.end_time, { outputFormat: 'M/d/yyyy' }, true)) || '-',
            audience: { ...item.audience }
          }
        })
      : []
  }, [])

  useEffect(() => {
    setLocalBots(getLocalBots(bots))
  }, [bots])

  const setDefaultSort = useCallback(() => {
    setLocalBots(getLocalBots(bots))
  }, [bots])

  const prepareFilters = filters => {
    let newFilters = { ...filters }
    const { age } = newFilters

    if (age) {
      const ageRange = {
        ...(age.value && age.value[0] && { min_age: { value: age.value[0], option: age.option } }),
        ...(age.value &&
          age.value[1] && { max_age: { value: age.value[1] === 75 ? 100 : age.value[1], option: age.option } })
      }
      newFilters = { ...newFilters, ...ageRange }
      delete newFilters.age
    }

    return newFilters
  }

  const handleFilterCampaigns = useCallback(
    filters => {
      let filteredLocation = [...getLocalBots(bots)]
      const preparedFilters = prepareFilters(filters)

      if (preparedFilters && Object.keys(preparedFilters).length !== 0) {
        Object.keys(preparedFilters).forEach(el => {
          const filterField = preparedFilters[el]
          const regExValue = new RegExp(filterField.value, 'gi')
          const isMatch = filterField && filterField.value && filterField.option
          if (el === 'startDate' || el === 'endDate') {
            filteredLocation =
              filteredLocation &&
              filteredLocation.filter(loc =>
                loc[el] && isMatch ? loc[el].match(regExValue) : loc[el] && !loc[el].match(regExValue)
              )
          } else {
            filteredLocation =
              filteredLocation &&
              filteredLocation.filter(loc =>
                loc.audience[el] && isMatch
                  ? String(loc.audience[el]).match(regExValue)
                  : loc.audience[el] && !String(loc.audience[el]).match(regExValue)
              )
          }
        })
      }

      setLocalBots(filteredLocation || [])
    },
    [bots]
  )

  const handleAddCampaign = useCallback(() => {
    history.push('/admin/campaigns/bot/new-bot')
  }, [history])

  const onRowClick = useCallback(
    record => {
      history.push(`/admin/campaigns/bot/${record.id}`)
    },
    [history]
  )

  return (
    <ST.Wrapper>
      <ST.FilterPanelWrapper count={(fieldsForMainPanelAdvanced && fieldsForMainPanelAdvanced.length) || 0}>
        <FilterPanel
          isAdvanced
          fieldsForMainPanelAdvanced={fieldsForMainPanelAdvanced}
          columnsData={optionsForFilters}
          handleFilterProducts={handleFilterCampaigns}
          defaultInitialState={defaultInitialStateFilters}
        >
          <ST.ButtonWrapper>
            <Button type='danger' size='large' onClick={handleAddCampaign}>
              {intl.get('campaigns.bot.buttonCreate')}
            </Button>
          </ST.ButtonWrapper>
        </FilterPanel>
      </ST.FilterPanelWrapper>
      <TableHeaderOptions
        totalItems={totalCount}
        itemsForSort={localBots}
        setCurrItemsForSort={sortedBots => setLocalBots(sortedBots)}
        paginationSize={paginationSize}
        handleChangePaginationSize={size => setPaginationSize(size)}
        setDefaultSort={setDefaultSort}
        optionsForSort={optionsForSort}
      />
      {isLoadingBots ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          rowKey='key'
          loading={isBotDeleting}
          limit={paginationSize}
          totalCounts={totalCount}
          data={localBots}
          onRowClick={onRowClick}
          pagination
          isNotRenderOnEmptyData
        />
      )}
    </ST.Wrapper>
  )
}

CampaignShpingBotTab.propTypes = {
  rewardsDeleteCampaignBot: PropTypes.func.isRequired,
  rewardsGetCampaignBots: PropTypes.func.isRequired,
  bots: PropTypes.arrayOf(PropTypes.object),
  isLoadingBots: PropTypes.bool,
  isBotDeleting: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  rewardsDuplicateCampaignBot: PropTypes.func.isRequired
}

CampaignShpingBotTab.defaultProps = {
  bots: null,
  isLoadingBots: false,
  isBotDeleting: false
}

export default withRouter(CampaignShpingBotTab)
