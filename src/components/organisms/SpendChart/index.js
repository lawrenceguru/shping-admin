import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import intl from 'react-intl-universal'
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Legend, LineSeries } from 'react-jsx-highcharts'
import * as ST from './styles'
import { rangeEnum, plotOptions } from './consts'
import RemoveIcon from '../../molecules/RemoveIcon'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'

const SpendsChart = ({
  selectRange,
  dataIndex,
  setItem,
  xItems,
  interactions,
  impressions,
  videoViews,
  reviews,
  isHaveData,
  ...props
}) => {
  const chart = {
    type: 'line',
    style: {
      'border-bottom-left-radius': '10px;',
      'border-bottom-right-radius': '10px;'
    }
  }

  const spendTitle = useMemo(() => {
    const header = intl.get('spend.header')
    return header === 'Траты'
      ? `${intl.get('spend.header')} ${intl.get(`overviewPage.${rangeEnum[selectRange]}`).toLowerCase()}`
      : `${intl.get(`overviewPage.${rangeEnum[selectRange]}`)} ${intl.get('spend.header')}`
  }, [selectRange])

  return (
    <ST.SpendChartBlock {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <ST.TitleChart>
          <div>{spendTitle}</div>
          <RemoveIcon setItem={setItem} />
        </ST.TitleChart>
        {isHaveData ? (
          <HighchartsChart chart={chart} plotOptions={plotOptions}>
            <Chart type='spline' />
            <ST.StyledTooltip valuePrefix='$ ' color='#ffffff' fill='#ffffff' border={0} />
            <Legend useHTML verticalAlign='top' />
            <XAxis categories={xItems} startOnTick gridLineWidth={1} />
            <YAxis>
              <YAxis.Title rotation={0}>$</YAxis.Title>
              <LineSeries name={intl.get(`spendPage.interactions`)} data={interactions} color='#1875f0' />
              <LineSeries name={intl.get(`spendPage.impressions`)} data={impressions} color='#00fffd' />
              <LineSeries name={intl.get(`spendPage.videoViews`)} data={videoViews} color='#ff4a4b' />
              <LineSeries name={intl.get(`spendPage.reviews`)} data={reviews} color='#f7cb4e' />
            </YAxis>
          </HighchartsChart>
        ) : (
          <NoDataPlaceholder />
        )}
      </div>
    </ST.SpendChartBlock>
  )
}

SpendsChart.propTypes = {
  selectRange: PropTypes.string.isRequired,
  setItem: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  xItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  interactions: PropTypes.arrayOf(PropTypes.number).isRequired,
  impressions: PropTypes.arrayOf(PropTypes.number).isRequired,
  videoViews: PropTypes.arrayOf(PropTypes.number).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.number).isRequired,
  isHaveData: PropTypes.bool.isRequired,
  dataIndex: PropTypes.string
}

SpendsChart.defaultProps = {
  dataIndex: null
}

export default withHighcharts(SpendsChart, Highcharts)
