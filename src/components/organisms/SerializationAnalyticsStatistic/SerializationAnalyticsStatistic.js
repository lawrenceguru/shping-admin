import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import SerializationAnalyticsChart from '../SerializationAnalyticsChart'
import { MonthsEnum } from '../../../utils/consts'
import { getActionsStatisticArrays } from '../../../utils/serializedAnalytics'

const SerializationAnalyticsStatistic = ({
  statistic,
  serializationGetProductsStatistic,
  setItem,
  dataIndex,
  dateAs,
  ...props
}) => {
  const xItems = useMemo(() => {
    return statistic
      ? statistic.map(el => {
          if (dateAs === 'month') {
            return `${intl.get(`overviewPage.months.${MonthsEnum[el.month]}`)}/ ${el.year}`
          }
          if (dateAs === 'day') {
            return `${el[dateAs]} / ${el.month}`
          }
          if (dateAs === 'weeks') {
            return `${el[dateAs]}`
          }
          return el[dateAs]
        })
      : []
  }, [statistic, dateAs])

  const chartData = useMemo(() => getActionsStatisticArrays(statistic), [statistic])

  const isHaveData = useMemo(() => {
    return Object.keys(chartData).some(item => {
      return chartData[item].some(elem => !!elem)
    })
  }, [chartData])

  useEffect(() => {
    serializationGetProductsStatistic()
  }, [])

  return (
    <SerializationAnalyticsChart
      xItems={xItems}
      dataIndex={dataIndex}
      isHaveData={isHaveData}
      statistic={chartData}
      setItem={setItem}
      selectRange={dateAs}
      {...props}
    />
  )
}

SerializationAnalyticsStatistic.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  statistic: PropTypes.arrayOf(PropTypes.object),
  serializationGetProductsStatistic: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  dateAs: PropTypes.string.isRequired,
  dataIndex: PropTypes.string
}

SerializationAnalyticsStatistic.defaultProps = {
  statistic: [],
  dataIndex: null
}

export default React.memo(SerializationAnalyticsStatistic)
