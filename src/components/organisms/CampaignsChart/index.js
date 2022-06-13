import React, { useMemo } from 'react'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import Highcharts from 'highcharts'
import PropTypes from 'prop-types'
import { HighchartsChart, withHighcharts, XAxis, YAxis, ColumnSeries } from 'react-jsx-highcharts'
import GraphHeader from '../../molecules/GraphHeader'
import { WidgetTemplate } from '../../../styles'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'

const StyledChart = styled(HighchartsChart)`
  border-radius: 0 0 6px 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  height: 100%;
  background-color: #fff;
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

const CampaignsChartWrapper = styled.div`
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

const CampaignChart = ({ campaigns, setItem, dataIndex, ...props }) => {
  const dataSource = useMemo(() => {
    return campaigns && campaigns.length ? campaigns.filter(item => !!item.aud) : []
  }, [campaigns])

  return (
    <CampaignsChartWrapper {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <WidgetTemplate isHaveNotData={!(campaigns && campaigns.length)}>
          <GraphHeader name={intl.get('overviewPage.campaigns.campaigns')} setItem={setItem} />
          {campaigns && campaigns.length ? (
            <StyledChart>
              <XAxis categories={dataSource.map(item => item.name)} labels={labels} />
              <YAxis>
                <ColumnSeries data={dataSource.map(item => item.aud)} color='#1875f0' />
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

CampaignChart.propTypes = {
  campaigns: PropTypes.arrayOf(PropTypes.object),
  setItem: PropTypes.func.isRequired,
  dataIndex: PropTypes.string
}

CampaignChart.defaultProps = {
  campaigns: [],
  dataIndex: null
}

export default withHighcharts(CampaignChart, Highcharts)
