/* eslint-disable prefer-destructuring */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import * as ST from './styles'
import FilterPanel from '../../molecules/FilterPanel'
import Reports from '../../organisms/Reports'
import { fieldsForMainPanelAdvanced, columns } from './consts'
import { name } from '../../../utils/consts'
import IconButton from '../../molecules/IconButton'

const ReceiptsReportsTab = ({
  reports,
  filters,
  countries,
  isLoadingCountries,
  storeCardsGetAllEntries,
  storeCardsGetReceiptsReports,
  isLoadingReports,
  history,
  stores
}) => {
  const filterOptions = useMemo(() => {
    return [
      ...fieldsForMainPanelAdvanced.slice(0, 2),
      {
        columnName: 'Store',
        fieldId: 'storeId',
        type: 'select',
        options: [
          {
            label: 'Any store',
            value: 'any'
          },
          ...(stores || [])
        ]
      },
      {
        columnName: 'Country',
        fieldId: 'countryId',
        type: 'select',
        options: [
          {
            label: 'Any country',
            value: 'any'
          },
          ...(countries && countries.length
            ? countries.map(item => ({ label: item.country_info[name], value: item.country_info.iso }))
            : [])
        ]
      }
    ]
  }, [countries, stores])

  const getReportDetails = useCallback(record => {
    history.push(`/admin/store-cards/receipts-reports/${record.user_id}/${record.receipt_id}`)
  }, [])

  const mergedColumns = useMemo(() => {
    return [
      {
        key: 'action',
        align: 'center',
        render: record => (
          <IconButton actionFunction={() => getReportDetails(record)} type='File' styleParam={{ fontSize: '20px' }} />
        )
      },
      ...(columns || [])
    ]
  }, [columns])

  useEffect(() => {
    storeCardsGetReceiptsReports({
      ...filters
    })

    if (!isLoadingCountries) {
      storeCardsGetAllEntries()
    }
  }, [])

  const handleFilterReports = useCallback(userFilters => {
    const userFiltersKeys = userFilters && Object.keys(userFilters)
    let filtersValues

    if (userFiltersKeys && userFiltersKeys.length) {
      filtersValues = userFiltersKeys.reduce((result, currItem) => {
        const currResult = { ...result }

        if (currItem === 'dates') {
          currResult.from_date = userFilters[currItem].value[0]
          currResult.to_date = userFilters[currItem].value[1]
        } else if (userFilters[currItem].value !== 'any') {
          currResult[currItem] = userFilters[currItem].value
        }

        return currResult
      }, {})

      storeCardsGetReceiptsReports({ ...filtersValues })
    }
  }, [])

  return (
    <ST.Wrapper>
      <Reports
        reports={reports}
        isLoading={isLoadingReports}
        header='Receipts reports'
        columns={mergedColumns}
        isColumnGraph
        pieHeader='Activity by store'
        tableHeader={`Total users wirh receiprts: ${reports && reports.totalWithCardUsage}`}
      >
        <FilterPanel
          isHaveNotResetButton
          isHaveNotPlaceholderForChildren
          fieldsForMainPanelAdvanced={filterOptions}
          noEquals
          handleFilterProducts={handleFilterReports}
          defaultInitialState={{
            dates: { value: filters && [filters.from_date, filters.to_date] },
            period: { value: 'days' },
            countryId: { value: 'any' },
            storeId: { value: 'any' }
          }}
        />
      </Reports>
    </ST.Wrapper>
  )
}

ReceiptsReportsTab.propTypes = {
  reports: PropTypes.object,
  filters: PropTypes.object,
  stores: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingCountries: PropTypes.bool,
  storeCardsGetAllEntries: PropTypes.func.isRequired,
  storeCardsGetReceiptsReports: PropTypes.func.isRequired,
  isLoadingReports: PropTypes.bool
}

ReceiptsReportsTab.defaultProps = {
  reports: null,
  filters: {},
  countries: null,
  isLoadingCountries: false,
  isLoadingReports: false,
  stores: null
}

export default ReceiptsReportsTab
