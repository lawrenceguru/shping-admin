import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import { HighchartsChart, withHighcharts, PieSeries, XAxis, Tooltip } from 'react-jsx-highcharts'
import * as ST from './styles'
import NoDataPlaceholder from '../NoDataPlaceholder'

const plotOptions = {
  pie: {
    cursor: 'default',
    dataLabels: {
      enabled: false
    }
  },
  series: {
    enableMouseTracking: true,
    innerSize: '80%'
  }
}

function formatter() {
  return `${this.key}: ${this.y}`
}

const PieChartReports = ({ header, data }) => {
  const isHaveData = useMemo(() => {
    return !!(data && data.length && data.find(item => item.y))
  }, [data])

  return (
    <ST.StyledChart>
      <ST.TitleChart>
        <div>{header}</div>
      </ST.TitleChart>
      {isHaveData ? (
        <HighchartsChart plotOptions={plotOptions}>
          <Tooltip color='#ffffff' fill='#ffffff' border={0} formatter={formatter} />
          <PieSeries name={header} data={data} size={200} />
          <XAxis min={0.01} />
        </HighchartsChart>
      ) : (
        <ST.WrapperNoDataPlaceholder>
          <NoDataPlaceholder />
        </ST.WrapperNoDataPlaceholder>
      )}
    </ST.StyledChart>
  )
}

PieChartReports.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  header: PropTypes.string
}

PieChartReports.defaultProps = {
  data: [],
  header: null
}

export default withHighcharts(PieChartReports, Highcharts)
