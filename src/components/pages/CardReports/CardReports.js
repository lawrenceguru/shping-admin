/* eslint-disable prefer-destructuring */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import * as ST from './styles'
import FilterPanel from '../../molecules/FilterPanel'
import Reports from '../../organisms/Reports'
import { fieldsForMainPanelAdvanced, columns } from './consts'
import { name } from '../../../utils/consts'
import IconButton from '../../molecules/IconButton'

const CardReports = ({
  storeCardsGetCardsReport,
  reports,
  history,
  isLoadingReports,
  filters,
  countries,
  isLoadingCountries,
  countryCards,
  storeCardsGetCountryCards,
  storeCardsGetAllEntries
}) => {
  const [country, setCountry] = useState(null)
  const filterOptions = useMemo(() => {
    return [
      ...fieldsForMainPanelAdvanced.slice(0, 2),
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
      },
      {
        columnName: 'Card',
        fieldId: 'cardId',
        type: 'select',
        options: [
          {
            label: 'Any card',
            value: 'any'
          },
          ...(countryCards && countryCards.length
            ? countryCards.map(item => ({ label: item.name, value: item.id }))
            : [])
        ]
      },
      ...fieldsForMainPanelAdvanced.slice(fieldsForMainPanelAdvanced.length - 1)
    ]
  }, [countries, countryCards])

  const getReportDetails = useCallback(record => {
    history.push(`/admin/store-cards/cards-reports/${record.user_id}/${record.id}`)
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
    if (!isLoadingReports) {
      storeCardsGetCardsReport({
        ...filters
      })
    }

    if (!isLoadingCountries) {
      storeCardsGetAllEntries()
    }
  }, [])

  useEffect(() => {
    if (country && country !== 'any') {
      storeCardsGetCountryCards({ id: country })
    }
  }, [country])

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

      storeCardsGetCardsReport({ ...filtersValues })
    }
  }, [])

  const getValueOnChange = useCallback((key, value) => {
    if (key === 'countryId') {
      setCountry(value)
    }
  }, [])

  return (
    <ST.Wrapper>
      <Reports
        reports={reports}
        columns={mergedColumns}
        isLoading={isLoadingReports}
        header='Store cards reports'
        pieHeader='Card activity'
        tableHeader={
          filters && filters.reportType === 'new'
            ? `Total users with new cards: ${reports && reports.totalWithNewCards}`
            : `Total users with cards usage: ${reports && reports.totalWithCardUsage}`
        }
      >
        <FilterPanel
          isHaveNotResetButton
          isHaveNotPlaceholderForChildren
          fieldsForMainPanelAdvanced={filterOptions}
          noEquals
          getValueOnChange={getValueOnChange}
          handleFilterProducts={handleFilterReports}
          defaultInitialState={{
            dates: { value: filters && [filters.from_date, filters.to_date] },
            reportType: { value: 'new' },
            period: { value: 'days' },
            countryId: { value: 'any' },
            cardId: { value: 'any' }
          }}
        />
      </Reports>
    </ST.Wrapper>
  )
}

CardReports.propTypes = {
  storeCardsGetCardsReport: PropTypes.func.isRequired,
  reports: PropTypes.object,
  history: PropTypes.object.isRequired,
  isLoadingReports: PropTypes.bool,
  filters: PropTypes.object,
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingCountries: PropTypes.bool,
  countryCards: PropTypes.arrayOf(PropTypes.object),
  storeCardsGetCountryCards: PropTypes.func.isRequired,
  storeCardsGetAllEntries: PropTypes.func.isRequired
}

CardReports.defaultProps = {
  reports: null,
  isLoadingReports: false,
  filters: null,
  countries: null,
  isLoadingCountries: false,
  countryCards: null
}

export default CardReports
