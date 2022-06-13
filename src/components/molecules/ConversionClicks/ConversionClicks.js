import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { YAxis, XAxis, ColumnSeries, withHighcharts, Tooltip } from 'react-jsx-highcharts'
import Highcharts from 'highcharts'
import GraphHeader from '../GraphHeader'
import { WidgetTemplate } from '../../../styles'
import { CampaignsChartWrapper, StyledChart } from './styles'
import WidgetError from '../../atoms/WidgetError'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'

const colors = ['#1875f0', '#50d166']

const plotOptions = {
  series: {
    colorByPoint: true,
    colors,
    dataLabels: {
      enabled: true,
      inside: true,
      align: 'right',
      color: '#fff'
    }
  }
}

const chart = {
  type: 'bar'
}

const labels = {
  useHTML: true,
  style: {
    width: '100px',
    whiteSpace: 'normal'
  },
  formatter() {
    return `<div
        align="right"
        style="word-wrap: break-word;
        word-break: break-all;
        width:100px;
        white-space:nowrap;
        overflow:hidden;
        max-width: 100px;
        text-overflow: ellipsis;"
        >
            ${this.value}
        </div>`
  }
}
const ConversionClicks = ({
  clicks,
  analyticsGetClicks,
  setItem,
  isRangeTooBig,
  selectSecondDate,
  realRequestFirstDate,
  dataIndex,
  ...props
}) => {
  useEffect(() => {
    analyticsGetClicks()
  }, [])

  const newClicks = useMemo(() => {
    return clicks && clicks.map(el => el.num_visits)
  }, [clicks])

  const categories = useMemo(() => {
    return clicks && clicks.map(el => (el && el.text) || (el && el.url) || 'Unknown')
  }, [clicks])

  return (
    <CampaignsChartWrapper {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <WidgetTemplate isHaveNotData={!(newClicks && newClicks.length)}>
          <GraphHeader name={intl.get('conversionPage.clicks')} setItem={setItem} />
          {newClicks && newClicks.length ? (
            <StyledChart plotOptions={plotOptions} chart={chart} chartHeight={700}>
              <Tooltip useHTML backgroundColor='rgba(255,255,255,1)' positioner={() => ({ isHeader: true })} />
              <XAxis categories={categories} labels={labels} />
              <YAxis>
                <ColumnSeries name={intl.get('conversionPage.clicks')} data={newClicks} />
              </YAxis>
              {isRangeTooBig && (
                <WidgetError
                  text={intl.get('validation.bigDateRange', {
                    firstDate: realRequestFirstDate,
                    secondDate: selectSecondDate
                  })}
                />
              )}
            </StyledChart>
          ) : (
            <NoDataPlaceholder />
          )}
        </WidgetTemplate>
      </div>
    </CampaignsChartWrapper>
  )
}

ConversionClicks.propTypes = {
  clicks: PropTypes.arrayOf(PropTypes.object),
  analyticsGetClicks: PropTypes.func.isRequired,
  isRangeTooBig: PropTypes.bool,
  setItem: PropTypes.func.isRequired,
  selectSecondDate: PropTypes.string,
  realRequestFirstDate: PropTypes.string,
  dataIndex: PropTypes.string
}

ConversionClicks.defaultProps = {
  clicks: [],
  selectSecondDate: null,
  realRequestFirstDate: null,
  isRangeTooBig: false,
  dataIndex: null
}

export default withHighcharts(ConversionClicks, Highcharts)
