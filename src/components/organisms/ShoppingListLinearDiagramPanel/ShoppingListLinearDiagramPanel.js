import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import intl from 'react-intl-universal'
import ShoppingListLinearDiagramGraph from '../ShoppingListLinearDiagramGraph'
import useGetShoppingListCollection from './useGetShoppingListCollection'

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

const OverviewEngagementPanel = ({ setItem, ...props }) => {
  const selectFirstDate = useSelector(({ filterAnalytics }) => filterAnalytics.selectFirstDate)
  const selectSecondDate = useSelector(({ filterAnalytics }) => filterAnalytics.selectSecondDate)
  const selectCountry = useSelector(({ filterAnalytics }) => filterAnalytics.selectCountry)
  const selectState = useSelector(({ filterAnalytics }) => filterAnalytics.selectState)
  const selectPostcode = useSelector(({ filterAnalytics }) => filterAnalytics.selectPostcode)
  const selectRange = useSelector(({ filterAnalytics }) => filterAnalytics.selectRange)
  const {
    users,
    addedProducts,
    purchasedProducts,
    finishClicks,
    receipts,
    loyalteeCards,
    dates
  } = useGetShoppingListCollection({
    from: selectFirstDate,
    to: selectSecondDate,
    aggregation: selectRange,
    country: selectCountry,
    state: selectState,
    postcode: selectPostcode
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
    <ShoppingListLinearDiagramGraph
      widgetName='engagement'
      selectRange={selectRange}
      xItems={xItems}
      users={users}
      addedProducts={addedProducts}
      purchasedProducts={purchasedProducts}
      finishClicks={finishClicks}
      receipts={receipts}
      loyalteeCards={loyalteeCards}
      setItem={setItem}
      {...props}
    />
  )
}

OverviewEngagementPanel.propTypes = {
  setItem: PropTypes.func.isRequired
}

export default React.memo(OverviewEngagementPanel)
