import React from 'react'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import Highcharts from 'highcharts'
import PropTypes from 'prop-types'
import { HighchartsChart, withHighcharts, XAxis, YAxis, ColumnSeries } from 'react-jsx-highcharts'
import GraphHeader from '../../molecules/GraphHeader'
import { WidgetTemplate } from '../../../styles'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'

import useGetReviewsByBrands from './useGetReviewsByBrands'

const StyledChart = styled(HighchartsChart)`
  border-radius: 0 0 6px 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  .highcharts-container {
    height: auto !important;
    .highcharts-root {
      height: 478px;
    }
  }
  & g > text > tspan {
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: normal;
    text-align: center;
    color: #808080;
    fill: #808080;
  }
  & text > tspan {
    color: #000000;
    fill: #000000;
    font-weight: bold;
    font-size: 1rem;
  }
  & .highcharts-axis-labels {
    font-family: Roboto;
    font-weight: bold;
    letter-spacing: normal;
    text-align: center;
  }
`

const ReviewsChartWrapper = styled.div`
  flex-basis: calc(50% - 30px);
  border-radius: 6px 6px 6px 6px;
  @media (max-width: 1440px) {
    flex-basis: calc(100% - 30px);
  }
`

const labels = {
  style: {
    color: '#808080',
    fill: '#808080',
    fontSize: '12px'
  }
}

const ReviewsByBrands = ({
  setItem,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  dataIndex,
  ...props
}) => {
  const { reviews } = useGetReviewsByBrands({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  return (
    <ReviewsChartWrapper {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <WidgetTemplate isHaveNotData>
          <GraphHeader name={intl.get('roiPage.reviewsByBrands')} setItem={setItem} />
          {reviews && reviews.length ? (
            <StyledChart>
              <XAxis categories={reviews.map(({ key }) => key || 'Unknown')} labels={labels} />
              <YAxis>
                <ColumnSeries data={reviews.map(item => item.value)} color='#1875f0' />
              </YAxis>
            </StyledChart>
          ) : (
            <NoDataPlaceholder />
          )}
        </WidgetTemplate>
      </div>
    </ReviewsChartWrapper>
  )
}

ReviewsByBrands.propTypes = {
  setItem: PropTypes.func.isRequired,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  dataIndex: PropTypes.string
}

ReviewsByBrands.defaultProps = {
  dataIndex: null
}

export default withHighcharts(ReviewsByBrands, Highcharts)
