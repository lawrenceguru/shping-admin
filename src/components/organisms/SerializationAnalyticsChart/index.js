import React from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import intl from 'react-intl-universal'
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Legend, LineSeries } from 'react-jsx-highcharts'
import * as ST from './styles'
import { rangeEnum, plotOptions, colors } from './consts'
import RemoveIcon from '../../molecules/RemoveIcon'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'

const SerializationAnalyticsChart = ({ selectRange, dataIndex, setItem, xItems, statistic, isHaveData, ...props }) => {
  const chart = {
    type: 'line',
    style: {
      'border-bottom-left-radius': '10px;',
      'border-bottom-right-radius': '10px;'
    }
  }

  return (
    <ST.SerializationChartBlock {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <ST.TitleChart>
          <div>
            {intl.get(`overviewPage.${rangeEnum[selectRange]}`)} {intl.get('overviewPage.serialization.header')}
          </div>
          <RemoveIcon setItem={setItem} />
        </ST.TitleChart>
        {isHaveData ? (
          <HighchartsChart chart={chart} plotOptions={plotOptions}>
            <Chart type='spline' />
            <ST.StyledTooltip valueSuffix=' Units' color='#ffffff' fill='#ffffff' border={0} />
            <Legend useHTML verticalAlign='top' />
            <XAxis categories={xItems} startOnTick gridLineWidth={1} />
            <YAxis>
              <YAxis.Title>Units</YAxis.Title>
              {Object.keys(statistic).map((item, index) => (
                <LineSeries
                  key={item}
                  name={intl.get(`overviewPage.serialization.${item}`)}
                  data={statistic[item]}
                  color={colors[index]}
                />
              ))}
            </YAxis>
          </HighchartsChart>
        ) : (
          <NoDataPlaceholder />
        )}
      </div>
    </ST.SerializationChartBlock>
  )
}

SerializationAnalyticsChart.propTypes = {
  selectRange: PropTypes.string.isRequired,
  setItem: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  xItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  statistic: PropTypes.object,
  isHaveData: PropTypes.bool.isRequired,
  dataIndex: PropTypes.string
}

SerializationAnalyticsChart.defaultProps = {
  statistic: null,
  dataIndex: null
}

export default withHighcharts(SerializationAnalyticsChart, Highcharts)
