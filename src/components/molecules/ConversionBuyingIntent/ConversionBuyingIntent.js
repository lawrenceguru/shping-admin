import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { YAxis, XAxis, ColumnSeries, withHighcharts, Tooltip } from 'react-jsx-highcharts'
import Highcharts from 'highcharts'
import GraphHeader from '../GraphHeader'
import { WidgetTemplate } from '../../../styles'
import { CampaignsChartWrapper, StyledChart } from './styles'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'
import useGetConversionBuyingIntentInteractions from './useGetConversionBuyingIntentInteractions'

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
const ConversionBuyingIntent = ({
  setItem,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  dataIndex,
  ...props
}) => {
  const { interactions } = useGetConversionBuyingIntentInteractions({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  const interactionCategories = useMemo(() => interactions.map(el => el.action, [interactions]))
  const interactionValues = useMemo(() => interactions.map(el => el.interactions, [interactions]))

  return (
    <CampaignsChartWrapper {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <WidgetTemplate>
          <GraphHeader name={intl.get('conversionPage.buyingIntent')} setItem={setItem} />
          {interactionValues && interactionValues.length ? (
            <StyledChart plotOptions={plotOptions} chart={chart} chartHeight={700}>
              <Tooltip useHTML backgroundColor='rgba(255,255,255,1)' positioner={() => ({ isHeader: true })} />
              <XAxis categories={interactionCategories} labels={labels} />
              <YAxis>
                <ColumnSeries name={intl.get('conversionPage.buyingIntent')} data={interactionValues} />
              </YAxis>
            </StyledChart>
          ) : (
            <NoDataPlaceholder />
          )}
        </WidgetTemplate>
      </div>
    </CampaignsChartWrapper>
  )
}

ConversionBuyingIntent.propTypes = {
  setItem: PropTypes.func.isRequired,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  dataIndex: PropTypes.string
}

ConversionBuyingIntent.defaultProps = {
  dataIndex: null
}

export default withHighcharts(ConversionBuyingIntent, Highcharts)
