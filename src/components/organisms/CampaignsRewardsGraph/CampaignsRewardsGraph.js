import React, { useCallback, useEffect, useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import { withHighcharts, XAxis, YAxis, LineSeries } from 'react-jsx-highcharts'
import { Select, DatePicker } from 'antd'
import moment from 'moment'
import * as ST from './styles'
import GraphHeader from '../../molecules/GraphHeader'
import { formatMap, labels, filterData, key } from './consts'
import { processServerDate } from '../../../utils/helpers/date'
import { convertFromUint256 } from '../../../utils/helpers/mathOperations'
import Loader from '../../templates/Loader'
import FilterPanel from '../../molecules/FilterPanel'

const { Option } = Select
const { RangePicker } = DatePicker

const CampaignsRewardsGraph = ({ chart, analyticsGetCampaignsChart, isCharLoading, rewardsActionsOptions }) => {
  const [dates, setDates] = useState([])
  const [filter, setFilter] = useState('months')
  const [eventType, setEventType] = useState(undefined)
  const chartData = useMemo(() => {
    if (chart && chart[filter]) {
      const filterChart = chart[filter]
      const { from_date: fromDate, to_date: toDate } = chart

      setDates([fromDate, toDate])

      const format = formatMap[filter]
      const dataInterval = processServerDate(filterChart, filter, fromDate, toDate, 'coins')
      const fromDateFormatted = moment(fromDate)
      const toDateFormatted =
        filter === 'weeks' && dataInterval.length > 0 ? dataInterval[dataInterval.length - 1].date : moment(toDate)
      const points = []
      let to = toDateFormatted.clone()
      let index = 0

      while (to > fromDateFormatted) {
        to = toDateFormatted.clone().subtract(index, filter)
        // eslint-disable-next-line no-loop-func
        const data = dataInterval.find(m => m.date.format(format.moment) === to.format(format.moment))

        if (data) {
          points.push({
            name: data.date.format(format.moment),
            [key]: Math.floor(Number(convertFromUint256(data.coins)))
          })
        } else {
          points.push({ name: to.format(format.moment), [key]: 0 })
        }

        index += 1
      }

      return points.reverse()
    }
    return []
  }, [chart])

  const categories = useMemo(() => {
    return (chartData && chartData.length && chartData.map(item => item.name)) || []
  }, [chartData])

  const data = useMemo(() => {
    return (chartData && chartData.length && chartData.map(item => item[key])) || []
  }, [chartData, key])

  const total = useMemo(() => {
    return (
      (chartData &&
        chartData.length &&
        chartData.reduce((totalValue, currItem) => {
          return totalValue + (!Number.isNaN(currItem[key]) ? currItem[key] : 0)
        }, 0)) ||
      0
    )
  }, [chartData, key])

  useEffect(() => {
    analyticsGetCampaignsChart({ by: filter })
  }, [])

  const handleOnChangeRangePicker = useCallback(value => {
    setDates([moment(value[0]).format('YYYY-MM-DD'), moment(value[1]).format('YYYY-MM-DD')])
  }, [])

  const handleFiltersChart = useCallback(
    (filtersFromPanel, isClear) => {
      let filters

      if (isClear) {
        analyticsGetCampaignsChart({ by: 'months' })
        return
      }

      if (eventType) {
        filters = {
          events: {
            type: eventType
          }
        }
      }

      analyticsGetCampaignsChart({
        by: filter,
        fromDate: dates && dates[0],
        toDate: dates && dates[1],
        filters
      })
    },
    [filter, dates, eventType]
  )

  const filterChartClear = useCallback(() => {
    setEventType(undefined)
    setFilter('months')
  }, [])
  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('campaigns.rewards.chartRewards.key')}</ST.Header>
      <ST.FilterPanelWrapper>
        <FilterPanel handleFilterProducts={handleFiltersChart} isFillValueCustom customClear={filterChartClear}>
          <ST.MainFieldsWrapper>
            <RangePicker
              size='large'
              value={(dates && dates.length && [moment(dates[0], 'YYYY-MM-DD'), moment(dates[1], 'YYYY-MM-DD')]) || []}
              onChange={handleOnChangeRangePicker}
              format='DD/MM/YYYY'
            />
            <Select
              size='large'
              value={filter}
              defaultValue={filter}
              getPopupContainer={trigger => trigger.parentNode}
              onChange={value => setFilter(value)}
            >
              {filterData &&
                filterData.length &&
                filterData.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
            </Select>
            <Select
              placeholder={intl.get('campaigns.rewards.filters.actionPlaceholder')}
              size='large'
              getPopupContainer={trigger => trigger.parentNode}
              onChange={value => setEventType(value)}
              value={eventType}
              defaultValue={eventType || undefined}
            >
              {rewardsActionsOptions && rewardsActionsOptions.length
                ? rewardsActionsOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))
                : null}
            </Select>
          </ST.MainFieldsWrapper>
        </FilterPanel>
      </ST.FilterPanelWrapper>
      {isCharLoading ? (
        <Loader style={{ position: 'relative' }} />
      ) : (
        <ST.StyledChartBlock>
          <GraphHeader
            name={intl.get('campaigns.rewards.chartRewards.valueLabel', { total })}
            isHaveRemoverIcon={false}
          />
          <ST.StyledChart>
            <ST.StyledTooltip color='#ffffff' fill='#ffffff' border={0} />
            <XAxis categories={categories} gridLineWidth={1} labels={labels} />
            <YAxis>
              <LineSeries name={intl.get('campaigns.rewards.chartRewards.key')} data={data} color='#1875f0' />
            </YAxis>
          </ST.StyledChart>
        </ST.StyledChartBlock>
      )}
    </ST.Wrapper>
  )
}

CampaignsRewardsGraph.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chart: PropTypes.object,
  analyticsGetCampaignsChart: PropTypes.func.isRequired,
  isCharLoading: PropTypes.bool,
  rewardsActionsOptions: PropTypes.arrayOf(PropTypes.object)
}

CampaignsRewardsGraph.defaultProps = {
  chart: null,
  isCharLoading: false,
  rewardsActionsOptions: []
}

export default withHighcharts(CampaignsRewardsGraph, Highcharts)
