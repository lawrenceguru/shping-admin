import React, { useMemo, useEffect } from 'react'
import intl from 'react-intl-universal'
import Highcharts from 'highcharts'
import PropTypes from 'prop-types'
import { withHighcharts, XAxis, YAxis, ColumnSeries, Legend } from 'react-jsx-highcharts'
import * as ST from './styles'
import GraphHeader from '../../molecules/GraphHeader'
import { WidgetTemplate } from '../../../styles'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'
import { labels } from './consts'
import useGetCrossMarketingPerformance from './useCrossMarketingPerformance'

const CrossMarketingPerformanceGraph = ({
  filterAnalyticSetAdsMode,
  setItem,
  dataIndex,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { brandsPerformance } = useGetCrossMarketingPerformance({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  const hasNoData = useMemo(() => {
    return !(
      brandsPerformance &&
      brandsPerformance.data &&
      brandsPerformance.data.find(item => item.data && item.data.length && item.data.find(elem => elem))
    )
  }, [brandsPerformance])

  useEffect(() => {
    filterAnalyticSetAdsMode('product')
  }, [])

  return (
    <ST.BrandsChartWrapper {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <WidgetTemplate isHaveNotData={hasNoData}>
          <GraphHeader name={intl.get('overviewPage.crossMarketPerformanceGraph.header')} setItem={setItem} />
          {!hasNoData ? (
            <ST.StyledChart>
              <Legend useHTML verticalAlign='top' />
              <XAxis
                categories={brandsPerformance.categories.map(item =>
                  item === 'other' ? intl.get('overviewPage.crossMarketPerformanceGraph.other') : item
                )}
                labels={labels}
              />
              <YAxis>
                {brandsPerformance.data &&
                  brandsPerformance.data.length !== 0 &&
                  brandsPerformance.data.map(item => (
                    <ColumnSeries key={item.name} data={item.data} color={item.color} name={item.name} />
                  ))}
              </YAxis>
            </ST.StyledChart>
          ) : (
            <NoDataPlaceholder />
          )}
        </WidgetTemplate>
      </div>
    </ST.BrandsChartWrapper>
  )
}

CrossMarketingPerformanceGraph.propTypes = {
  setItem: PropTypes.func.isRequired,
  filterAnalyticSetAdsMode: PropTypes.func.isRequired,
  dataIndex: PropTypes.string,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired
}

CrossMarketingPerformanceGraph.defaultProps = {
  dataIndex: null
}

export default withHighcharts(CrossMarketingPerformanceGraph, Highcharts)
