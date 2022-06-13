import React, { useMemo } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Highcharts from 'highcharts'
import { HighchartsChart, withHighcharts, XAxis, YAxis, ColumnSeries } from 'react-jsx-highcharts'
import GraphHeader from '../../molecules/GraphHeader'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'

const StyledChart = styled(HighchartsChart)`
  border-radius: 0px 0px 6px 6px;
  & g > text > tspan {
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: normal;
    text-align: center;
    color: #808080;
    fill: #808080;
  }
  & > text > tspan {
    color: #000000;
    fill: #000000;
    font-weight: bold;
    font-size: 1rem;
  }
`

const StyledChartBlock = styled.div`
  border-radius: 0px 0px 6px 6px;
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  height: calc(100% - 51px);
`

const categories = [
  '0-20',
  '21-25',
  '26-30',
  '31-35',
  '36-40',
  '41-45',
  '46-50',
  '51-56',
  '56-60',
  '61-65',
  '66-70',
  '70+'
]

export const colors = [
  '#50d166',
  '#ff4a4b',
  '#1875f0',
  '#5553ce',
  '#f7cb4e',
  '#1875f0',
  '#b3b3b3',
  '#50d166',
  '#ff4a4b',
  '#1875f0',
  '#5553ce',
  '#f7cb4e',
  '#1875f0',
  '#b3b3b3',
  '#50d166',
  '#ff4a4b'
]

const labels = {
  style: {
    fontSize: '12px',
    fontWeight: 'bold',
    lineHeight: 1.25,
    color: '#808080',
    transform: 'none'
  }
}

const plotOptions = {
  series: {
    dataLabels: {
      enabled: true
    },
    enableMouseTracking: false,
    colorByPoint: true,
    colors
  }
}

const AudienceGraph = ({ newArray, setItem }) => {
  const isHaveData = useMemo(() => {
    return newArray.some(elem => !Number.isNaN(elem))
  }, [newArray])

  return (
    <StyledChartBlock>
      <GraphHeader name={intl.get('audiencePage.audience')} setItem={setItem} />
      {isHaveData ? (
        <StyledChart plotOptions={plotOptions}>
          <XAxis categories={categories} labels={labels} />
          <YAxis>
            <ColumnSeries data={newArray} />
          </YAxis>
        </StyledChart>
      ) : (
        <NoDataPlaceholder />
      )}
    </StyledChartBlock>
  )
}

AudienceGraph.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  newArray: PropTypes.arrayOf(PropTypes.number),
  setItem: PropTypes.func.isRequired
}

AudienceGraph.defaultProps = {
  newArray: []
}

export default withHighcharts(AudienceGraph, Highcharts)
