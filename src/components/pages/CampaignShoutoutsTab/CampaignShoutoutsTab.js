import React, { useCallback, useEffect, useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import IconButton from '../../molecules/IconButton'
import deleteModal from '../../molecules/DeleteModal'
import { formatDateTime, getDataInFormatUTCToAPi } from '../../../utils/helpers/date'
import * as ST from './styles'
import { defaultInitialStateFilters, fieldsForMainPanelAdvanced, optionsForFilters } from './consts'
import FilterPanel from '../../molecules/FilterPanel'
import Button from '../../atoms/Button'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import Loader from '../../templates/Loader'
import Table from '../../molecules/Table'
import { name } from '../../../utils/consts'

const CampaignShoutoutsTab = ({
  history,
  rewardsGetCampaignShoutouts,
  rewardsDeleteCampaignShoutouts,
  isLoadingShoutouts,
  shoutouts,
  isShoutoutDeleting,
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  settingsGetCountries,
  settingsGetLanguages,
  rewardsDuplicateCampaignShoutout
}) => {
  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      align: 'center',
      title: intl.get('campaigns.shoutouts.tableHeader1')
    },
    {
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      title: intl.get('campaigns.shoutouts.tableHeader2')
    },
    {
      key: 'points',
      dataIndex: 'points',
      align: 'center',
      title: intl.get('campaigns.shoutouts.tableHeader3')
    },
    {
      key: 'startDate',
      dataIndex: 'startDate',
      align: 'center',
      title: intl.get('campaigns.shoutouts.tableHeader4')
    },
    {
      key: 'endDate',
      dataIndex: 'endDate',
      align: 'center',
      title: intl.get('campaigns.shoutouts.tableHeader5')
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
                () => rewardsDeleteCampaignShoutouts(data.id),
                intl.get('campaigns.shoutouts.deleteMessage', { name: data.name })
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
            rewardsDuplicateCampaignShoutout(data.id)
            history.push('/admin/campaigns/shoutouts/new-shoutout')
          }}
        />
      )
    }
  ]

  const [localShoutouts, setLocalShoutouts] = useState([])
  const [paginationSize, setPaginationSize] = useState(10)
  const [filters, setFilters] = useState({})
  const totalCount = useMemo(() => (localShoutouts && localShoutouts.length) || 0, [localShoutouts])
  const optionsForSort = useMemo(() => {
    return columns && columns.length ? columns.filter(option => !['delete', 'copy'].includes(option.key)) : []
  }, [columns])
  const filterOptions = useMemo(() => {
    const newOptions = [...optionsForFilters]

    if (languages && languages.length) {
      newOptions.unshift({
        columnName: intl.get('campaigns.shoutouts.filters.language'),
        fieldId: 'language',
        type: 'select',
        mode: 'multiple',
        placeholder: intl.get('campaigns.shoutouts.filters.languagePlaceholder'),
        options: languages.map(item => ({
          value: item.code,
          label: item[name]
        }))
      })
    }

    if (countries && countries.length) {
      newOptions.unshift({
        columnName: intl.get('campaigns.shoutouts.filters.country'),
        fieldId: 'country',
        type: 'select',
        mode: 'multiple',
        placeholder: intl.get('campaigns.shoutouts.filters.countryPlaceholder'),
        options: countries.map(item => ({
          value: item.iso,
          label: item[name]
        }))
      })
    }

    return newOptions
  }, [countries, languages, optionsForFilters])

  useEffect(() => {
    if (!isLoadingShoutouts) {
      rewardsGetCampaignShoutouts(filters)
    }

    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }

    if ((!languages || !languages.length) && !isLoadingLanguages) {
      settingsGetLanguages()
    }
  }, [])

  const getLocalShoutouts = useCallback(serverBots => {
    return serverBots && serverBots.length
      ? serverBots.map(item => {
          return {
            id: item.id,
            key: item.id,
            name: item.name || '-',
            status: item.status || '-',
            points: (item.products && item.products.length) || 0,
            startDate: (item.start_date && formatDateTime(item.start_date, { outputFormat: 'M/d/yyyy' }, true)) || '-',
            endDate: (item.end_date && formatDateTime(item.end_date, { outputFormat: 'M/d/yyyy' }, true)) || '-',
            audience: { ...item.audience }
          }
        })
      : []
  }, [])

  useEffect(() => {
    setLocalShoutouts(getLocalShoutouts(shoutouts))
  }, [shoutouts])

  const getRequestForServer = useCallback(userFilters => {
    const audienceOptions = ['user_levels', 'gender', 'max_age', 'min_age', 'language', 'country']
    let validFilters = { ...userFilters }
    const { age } = validFilters

    if (age) {
      const ageRange = {
        ...(age.value && age.value[0] && { min_age: { value: age.value[0], option: age.option } }),
        ...(age.value &&
          age.value[1] && { max_age: { value: age.value[1] === 75 ? 100 : age.value[1], option: age.option } })
      }
      validFilters = { ...validFilters, ...ageRange }
      delete validFilters.age
    }

    if (validFilters.gender && validFilters.gender.value === 'any') {
      delete validFilters.gender
    }

    if (validFilters.start_date && validFilters.start_date.value) {
      validFilters.start_date.value = getDataInFormatUTCToAPi(
        validFilters.start_date.value,
        'YYYY-M-D',
        false,
        true,
        false
      )
    }

    if (validFilters.end_date && validFilters.end_date.value) {
      validFilters.end_date.value = getDataInFormatUTCToAPi(
        validFilters.end_date.value,
        'YYYY-M-D',
        false,
        false,
        false
      )
    }

    return Object.keys(validFilters).reduce((result, key) => {
      const currResult = { ...result }

      if (audienceOptions.includes(key)) {
        currResult.audience = {
          ...currResult.audience,
          [key]: validFilters[key].value
        }
      } else {
        currResult[key] = validFilters[key].value
      }

      return currResult
    }, {})
  })

  const handleFilterShoutouts = useCallback(
    userFilters => {
      const request = getRequestForServer(userFilters)
      setFilters(request)
      rewardsGetCampaignShoutouts(request)
    },
    [shoutouts]
  )

  const setDefaultSort = useCallback(() => {
    setLocalShoutouts(getLocalShoutouts(shoutouts))
  }, [shoutouts])

  const handleAddShoutout = useCallback(() => {
    history.push('/admin/campaigns/shoutouts/new-shoutout')
  }, [history])

  const onRowClick = useCallback(
    record => {
      history.push(`/admin/campaigns/shoutouts/${record.id}`)
    },
    [history]
  )

  return (
    <ST.Wrapper>
      <ST.FilterPanelWrapper count={(fieldsForMainPanelAdvanced && fieldsForMainPanelAdvanced.length) || 0}>
        <FilterPanel
          isAdvanced
          noEquals
          fieldsForMainPanelAdvanced={fieldsForMainPanelAdvanced}
          columnsData={filterOptions}
          handleFilterProducts={handleFilterShoutouts}
          defaultInitialState={defaultInitialStateFilters}
        >
          <ST.ButtonWrapper>
            <Button type='danger' size='large' onClick={handleAddShoutout}>
              {intl.get('campaigns.shoutouts.buttonCreate')}
            </Button>
          </ST.ButtonWrapper>
        </FilterPanel>
      </ST.FilterPanelWrapper>
      <TableHeaderOptions
        totalItems={totalCount}
        itemsForSort={localShoutouts}
        setCurrItemsForSort={sortedShoutouts => setLocalShoutouts(sortedShoutouts)}
        paginationSize={paginationSize}
        handleChangePaginationSize={size => setPaginationSize(size)}
        setDefaultSort={setDefaultSort}
        optionsForSort={optionsForSort}
      />
      {isLoadingShoutouts ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          rowKey='key'
          loading={isShoutoutDeleting}
          limit={paginationSize}
          totalCounts={totalCount}
          data={localShoutouts}
          onRowClick={onRowClick}
          pagination
          isNotRenderOnEmptyData
        />
      )}
    </ST.Wrapper>
  )
}

CampaignShoutoutsTab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  languages: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  rewardsGetCampaignShoutouts: PropTypes.func.isRequired,
  rewardsDeleteCampaignShoutouts: PropTypes.func.isRequired,
  isLoadingShoutouts: PropTypes.bool,
  shoutouts: PropTypes.arrayOf(PropTypes.object),
  isShoutoutDeleting: PropTypes.bool,
  isLoadingLanguages: PropTypes.bool,
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  rewardsDuplicateCampaignShoutout: PropTypes.func.isRequired
}

CampaignShoutoutsTab.defaultProps = {
  isLoadingLanguages: false,
  isLoadingCountries: false,
  languages: [],
  countries: [],
  isLoadingShoutouts: false,
  shoutouts: null,
  isShoutoutDeleting: false
}

export default CampaignShoutoutsTab
