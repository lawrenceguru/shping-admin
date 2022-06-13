import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import intl from 'react-intl-universal'
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Legend, LineSeries } from 'react-jsx-highcharts'
import * as ST from './styles'
import { rangeEnum, plotOptions, tooltipData } from './consts'
import RemoveIcon from '../../molecules/RemoveIcon'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'

const OverviewEngagementGraph = ({
  selectRange,
  setItem,
  dataIndex,
  xItems,
  scans,
  impressions,
  users,
  clicks,
  ...props
}) => {
  const [nameOfHoverLabel, setNameOfHoverLabel] = useState(null)
  const legend = {}
  const isHaveData = useMemo(() => {
    const isScansHaveData = scans && scans.length && scans.some(elem => elem !== 0)
    const isImpressionsHaveData = impressions && impressions.length && impressions.some(elem => elem !== 0)
    const isUsersHaveData = users && users.length && users.some(elem => elem !== 0)
    const isClicksHaveData = clicks && clicks.length && clicks.some(elem => elem !== 0)
    return isClicksHaveData || isImpressionsHaveData || isScansHaveData || isUsersHaveData
  }, [scans, impressions, users, clicks])
  const chart = {
    type: 'line',
    style: {
      'border-bottom-left-radius': '10px;',
      'border-bottom-right-radius': '10px;'
    },
    events: {
      load() {
        setTimeout(() => {
          if (legend && legend.allItems) {
            legend.allItems.forEach(item => {
              const label = item.legendItem.element
              label.addEventListener('mouseover', () => {
                setNameOfHoverLabel(label.textContent[0].toLowerCase() + label.textContent.slice(1))
              })
              label.addEventListener('mouseout', () => {
                setNameOfHoverLabel(null)
              })
            })
          }
        }, 1000)
      }
    }
  }

  return (
    <ST.OverviewEngagementBlock {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <ST.LegendTooltip isVisible={!!nameOfHoverLabel}>
          <ST.TooltipHeader>{nameOfHoverLabel && intl.get(`overviewPage.${nameOfHoverLabel}`)}</ST.TooltipHeader>
          {nameOfHoverLabel && tooltipData[nameOfHoverLabel].map(field => <span key={field}>{field}</span>)}
        </ST.LegendTooltip>
        <ST.TitleChart>
          <div>
            {intl.get(`overviewPage.${rangeEnum[selectRange]}`)} {intl.get('overviewPage.engagement')}
          </div>
          <RemoveIcon setItem={setItem} />
        </ST.TitleChart>
        {isHaveData ? (
          <HighchartsChart useHTML chart={chart} plotOptions={plotOptions}>
            <Chart type='spline' />
            <ST.StyledTooltip valueSuffix=' units' color='#ffffff' fill='#ffffff' border={0} />
            <Legend useHTML verticalAlign='top' />
            <XAxis categories={xItems} startOnTick gridLineWidth={1} />
            <YAxis>
              <YAxis.Title verticalAlign='top'>{intl.get(`overviewPage.units`)}</YAxis.Title>
              <LineSeries name={intl.get(`overviewPage.scans`)} data={scans} color='#ff4a4b' />
              <LineSeries name={intl.get(`overviewPage.impressions`)} data={impressions} color='#00fffd' />
              <LineSeries name={intl.get(`overviewPage.users`)} data={users} color='#f7cb4e' />
              <LineSeries name={intl.get(`overviewPage.interactions`)} data={clicks} color='#1875f0' />
            </YAxis>
          </HighchartsChart>
        ) : (
          <NoDataPlaceholder />
        )}
      </div>
    </ST.OverviewEngagementBlock>
  )
}

OverviewEngagementGraph.propTypes = {
  selectRange: PropTypes.string.isRequired,
  setItem: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  xItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  scans: PropTypes.arrayOf(PropTypes.number).isRequired,
  impressions: PropTypes.arrayOf(PropTypes.number).isRequired,
  users: PropTypes.arrayOf(PropTypes.number).isRequired,
  clicks: PropTypes.arrayOf(PropTypes.number).isRequired,
  dataIndex: PropTypes.string
}

OverviewEngagementGraph.defaultProps = {
  dataIndex: null
}

export default withHighcharts(OverviewEngagementGraph, Highcharts)
