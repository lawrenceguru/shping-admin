import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { YAxis, XAxis, ColumnSeries, withHighcharts, Tooltip } from 'react-jsx-highcharts'
import Highcharts from 'highcharts'
import GraphHeader from '../GraphHeader'
import { WidgetTemplate } from '../../../styles'
import { CampaignsChartWrapper, StyledChart } from './styles'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'
import useGetRoiCommunityGrowth from './useGetRoiCommunityGrowth'

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
const RoiCommunityGrowth = ({
  setItem,
  dataIndex,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { interactions } = useGetRoiCommunityGrowth({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  const hasNoData = interactions.every(el => el.interactions === 0)

  const interactionCategories = useMemo(() => interactions.map(el => el.action, [interactions]))
  const interactionValues = useMemo(() => interactions.map(el => el.interactions, [interactions]))

  return (
    <CampaignsChartWrapper {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <WidgetTemplate isHaveNotData={hasNoData}>
          <GraphHeader name={intl.get('roiPage.communityGrowth')} setItem={setItem} />
          {!hasNoData && interactionValues && interactionValues.length ? (
            <StyledChart plotOptions={plotOptions} chart={chart} chartHeight={700}>
              <Tooltip useHTML backgroundColor='rgba(255,255,255,1)' positioner={() => ({ isHeader: true })} />
              <XAxis categories={interactionCategories} labels={labels} />
              <YAxis>
                <ColumnSeries name={intl.get('conversionPage.clicks')} data={interactionValues} />
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

RoiCommunityGrowth.propTypes = {
  setItem: PropTypes.func.isRequired,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  dataIndex: PropTypes.string
}

RoiCommunityGrowth.defaultProps = {
  dataIndex: null
}

export default withHighcharts(RoiCommunityGrowth, Highcharts)
