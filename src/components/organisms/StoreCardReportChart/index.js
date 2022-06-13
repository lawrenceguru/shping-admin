import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import { withHighcharts, XAxis, YAxis, LineSeries, ColumnSeries } from 'react-jsx-highcharts'
import * as ST from './styles'
import GraphHeader from '../../molecules/GraphHeader'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'

const labels = {
  style: {
    fontSize: '12px',
    fontWeight: 'bold',
    lineHeight: 1.25,
    color: '#808080'
  }
}

const CampaignsRewardsGraph = ({ data, header, isColumnGraph }) => {
  const categories = useMemo(() => {
    return data && data.length && data.map(item => item.date)
  }, [data])

  const dataSource = useMemo(() => {
    return data && data.length && data.map(item => item.points)
  }, [data])

  const isHaveData = useMemo(() => {
    return !!(data && data.length !== 0 && data.find(item => item.points))
  }, [data])

  return (
    <>
      <ST.StyledChartBlock>
        <GraphHeader name={header} isHaveRemoverIcon={false} />
        {isHaveData ? (
          <ST.StyledChart>
            <ST.StyledTooltip color='#ffffff' fill='#ffffff' border={0} />
            <XAxis categories={categories} gridLineWidth={1} labels={labels} />
            <YAxis>
              {isColumnGraph ? (
                <ColumnSeries name='Receipts' data={dataSource} color='#1875f0' />
              ) : (
                <LineSeries data={dataSource} color='#1875f0' />
              )}
            </YAxis>
          </ST.StyledChart>
        ) : (
          <ST.WrapperNoDataPlaceholder>
            <NoDataPlaceholder />
          </ST.WrapperNoDataPlaceholder>
        )}
      </ST.StyledChartBlock>
    </>
  )
}

CampaignsRewardsGraph.propTypes = {
  header: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  isColumnGraph: PropTypes.bool
}

CampaignsRewardsGraph.defaultProps = {
  data: [],
  header: null,
  isColumnGraph: false
}

export default withHighcharts(CampaignsRewardsGraph, Highcharts)
