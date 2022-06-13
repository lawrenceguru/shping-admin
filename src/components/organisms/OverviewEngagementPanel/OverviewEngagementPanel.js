import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import OverviewEngagementGraph from '../OverviewEngagementGraph'
import useGetOverviewEngagement from './useGetOverviewEngagement'

const MonthsEnum = {
  1: 'january',
  2: 'february',
  3: 'march',
  4: 'april',
  5: 'may',
  6: 'june',
  7: 'july',
  8: 'august',
  9: 'september',
  10: 'october',
  11: 'november',
  12: 'december'
}

const OverviewEngagementPanel = ({
  selectRange,
  selectFirstDate,
  selectSecondDate,
  setItem,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { scans, clicks, impressions, interactions, dates } = useGetOverviewEngagement({
    from: selectFirstDate,
    to: selectSecondDate,
    aggregation: selectRange,
    brand: selectBrand,
    country: selectCountry
  })

  const xItems = dates
    ? dates.map(el => {
        if (selectRange === 'get_months') {
          return `${intl.get(`overviewPage.months.${MonthsEnum[el.month]}`)}/ ${el.year}`
        }
        if (selectRange === 'get_days') {
          return `${el[selectRange.split('_')[1].slice(0, -1)]} / ${el.month}`
        }
        if (selectRange === 'get_weeks') {
          return `${el[selectRange.split('_')[1].slice(0, -1)]} / ${el.year}`
        }
        return el[selectRange.split('_')[1].slice(0, -1)]
      })
    : []

  return (
    <OverviewEngagementGraph
      widgetName='engagement'
      selectRange={selectRange}
      xItems={xItems}
      scans={scans}
      impressions={impressions}
      users={interactions}
      clicks={clicks}
      setItem={setItem}
      {...props}
    />
  )
}

OverviewEngagementPanel.propTypes = {
  selectRange: PropTypes.string.isRequired,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  setItem: PropTypes.func.isRequired
}

export default React.memo(OverviewEngagementPanel)
