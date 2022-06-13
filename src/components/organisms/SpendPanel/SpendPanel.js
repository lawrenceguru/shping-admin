import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import SpendChart from '../SpendChart'
import { MonthsEnum } from '../../../utils/consts'
import useGetSpends from './useGetSpends'

const SpendPanel = ({
  dataIndex,
  setItem,
  selectRange,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  setTableHeight,
  selectGtin,
  ...props
}) => {
  const { impressions, interactions, reviews, videoViews, dates } = useGetSpends({
    from: selectFirstDate,
    to: selectSecondDate,
    aggregation: selectRange,
    brand: selectBrand,
    country: selectCountry,
    gtins: selectGtin
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

  const hasData = useMemo(() => !!(impressions.length && interactions.length && reviews.length && videoViews.length), [
    impressions,
    interactions,
    reviews,
    videoViews
  ])

  return (
    <SpendChart
      xItems={xItems}
      dataIndex={dataIndex}
      isHaveData={hasData}
      impressions={impressions}
      interactions={interactions}
      reviews={reviews}
      videoViews={videoViews}
      setItem={setItem}
      selectRange={selectRange}
      {...props}
    />
  )
}

SpendPanel.propTypes = {
  setItem: PropTypes.func.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  selectRange: PropTypes.string.isRequired,
  dataIndex: PropTypes.string,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  selectGtin: PropTypes.arrayOf(PropTypes.string).isRequired
}

SpendPanel.defaultProps = {
  dataIndex: null
}

export default React.memo(SpendPanel)
