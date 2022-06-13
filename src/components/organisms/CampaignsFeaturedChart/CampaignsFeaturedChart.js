import React, { useCallback, useEffect, useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import { withHighcharts, XAxis, YAxis, LineSeries } from 'react-jsx-highcharts'
import { DatePicker } from 'antd'
import moment from 'moment'
import * as ST from './styles'
import GraphHeader from '../../molecules/GraphHeader'
import { formatDays, colors, initialDates, labels } from './consts'
import Loader from '../../templates/Loader'
import FilterPanel from '../../molecules/FilterPanel'
import { getGroupedFeatureProductMonitoringData } from '../../../utils/campaign'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'
import { getDatePickerLocale, getMomentLocale } from '../../../utils/helpers/date'

const { RangePicker } = DatePicker
moment.locale(getMomentLocale())

const CampaignsFeaturedChart = ({ chart, campaignsFeaturedGetFeaturedChart, chartIsLoading, featuredList }) => {
  const [dates, setDates] = useState(initialDates)

  const chartData = useMemo(() => {
    if (chart && chart.length) {
      const { dataIntervals, namesProducts, total } = getGroupedFeatureProductMonitoringData(chart, featuredList)
      const fromDateFormatted = moment(dates[0])
      const toDateFormatted = moment(dates[1])
      const defaultItem =
        namesProducts &&
        Object.keys(namesProducts).reduce((currRes, currItem) => {
          const res = { ...currRes }
          res[namesProducts[currItem]] = 0
          return res
        }, {})
      const points = []
      const categories = []
      let to = toDateFormatted.clone()

      if (dates[0] === dates[1]) {
        const data = dataIntervals.find(m => m.date.format(formatDays.moment) === to.format(formatDays.moment))
        const point = {
          ...defaultItem
        }
        Object.keys(data).forEach(item => {
          point[item] = data[item]
        })
        categories.push(data.date.format('DD/MM'))
        points.push(point)
      }

      // eslint-disable-next-line no-plusplus
      for (let i = 0; to > fromDateFormatted; i++) {
        to = toDateFormatted.clone().subtract(i, 'days')
        // eslint-disable-next-line no-loop-func
        const data = dataIntervals.find(m => m.date.format(formatDays.moment) === to.format(formatDays.moment))
        if (data) {
          const point = {
            ...defaultItem
          }
          Object.keys(data).forEach(item => {
            point[item] = data[item]
          })
          categories.push(data.date.format('DD/MM'))
          points.push(point)
        } else {
          points.push({
            ...defaultItem
          })
          categories.push(to.format('DD/MM'))
        }
      }
      points.reverse()
      categories.reverse()

      let series = null

      if (namesProducts && points) {
        series = {}
        Object.keys(namesProducts).forEach(item => {
          series[namesProducts[item]] = points.map(elem => elem[namesProducts[item]] || 0)
        })
      }

      return {
        categories,
        series,
        total
      }
    }
    return {}
  }, [chart, featuredList])

  useEffect(() => {
    campaignsFeaturedGetFeaturedChart({
      fromDate: dates && dates[0],
      toDate: dates && dates[1]
    })
  }, [])

  const handleOnChangeRangePicker = useCallback(value => {
    setDates([moment(value[0]).format('YYYY-MM-DD'), moment(value[1]).format('YYYY-MM-DD')])
  }, [])

  const handleFiltersChart = useCallback(
    (filtersFromPanel, isClear) => {
      if (isClear) {
        campaignsFeaturedGetFeaturedChart()
        return
      }

      campaignsFeaturedGetFeaturedChart({
        fromDate: dates && dates[0],
        toDate: dates && dates[1]
      })
    },
    [dates]
  )

  const filterChartClear = useCallback(() => {
    campaignsFeaturedGetFeaturedChart({
      fromDate: initialDates[0],
      toDate: initialDates[1]
    })
    setDates(initialDates)
  }, [initialDates])

  const disabledDate = useCallback(
    current => {
      return current && current > moment().startOf('day')
    },
    [moment]
  )

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('campaigns.featured.chart.title')}</ST.Header>
      <ST.FilterPanelWrapper>
        <FilterPanel handleFilterProducts={handleFiltersChart} isFillValueCustom customClear={filterChartClear}>
          <ST.MainFieldsWrapper>
            <RangePicker
              size='large'
              locale={getDatePickerLocale()}
              disabledDate={disabledDate}
              value={(dates && dates.length && [moment(dates[0], 'YYYY-MM-DD'), moment(dates[1], 'YYYY-MM-DD')]) || []}
              onChange={handleOnChangeRangePicker}
              format='DD/MM/YYYY'
            />
          </ST.MainFieldsWrapper>
        </FilterPanel>
      </ST.FilterPanelWrapper>
      {chartIsLoading ? (
        <Loader style={{ position: 'relative' }} />
      ) : (
        <ST.StyledChartBlock>
          <GraphHeader
            name={intl.get('campaigns.featured.chart.valueLabel', { total: (chartData && chartData.total) || 0 })}
            isHaveRemoverIcon={false}
          />
          {chartData && chartData.series ? (
            <ST.StyledChart>
              <ST.StyledTooltip color='#ffffff' fill='#ffffff' border={0} />
              <XAxis gridLineWidth={1} categories={(chartData && chartData.categories) || []} labels={labels} />
              <YAxis>
                {Object.keys(chartData.series).map((item, index) => (
                  <LineSeries key={item} name={item} data={chartData.series[item]} color={colors[index]} />
                ))}
              </YAxis>
            </ST.StyledChart>
          ) : (
            <ST.WrapperNoDataPlaceholder>
              <NoDataPlaceholder />
            </ST.WrapperNoDataPlaceholder>
          )}
        </ST.StyledChartBlock>
      )}
    </ST.Wrapper>
  )
}

CampaignsFeaturedChart.propTypes = {
  campaignsFeaturedGetFeaturedChart: PropTypes.func.isRequired,
  chartIsLoading: PropTypes.bool,
  chart: PropTypes.arrayOf(PropTypes.object),
  featuredList: PropTypes.arrayOf(PropTypes.object)
}

CampaignsFeaturedChart.defaultProps = {
  chartIsLoading: false,
  chart: null,
  featuredList: null
}

export default withHighcharts(CampaignsFeaturedChart, Highcharts)
