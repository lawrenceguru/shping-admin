import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import { HighchartsChart, withHighcharts, PieSeries, XAxis } from 'react-jsx-highcharts'
import RemoveIcon from '../../molecules/RemoveIcon'
import { StyledChart, TitleChart, StyledLegend, Circle, Legends, Legend } from './styles'
import NoDataPlaceholder from '../NoDataPlaceholder'

const plotOptions = {
  pie: {
    cursor: 'default',
    dataLabels: {
      enabled: true,
      padding: 0,
      margin: 0,
      style: { fontSize: 11, color: '#808080' },
      format: '<b>{point.name}</b>: {point.percentage:.1f} %'
    }
  },
  series: {
    enableMouseTracking: false
  }
}

const AudiencePie = ({
  pieName,
  dataIndex,
  pieData,
  setItem,
  invisibleItems,
  widgetName,
  getMaxCountItems,
  showLegend,
  ...props
}) => {
  const labels = useMemo(() => {
    let total = 0
    const res = []
    pieData.forEach(el => {
      total += el.y
    })
    pieData.forEach(el => {
      const percent = ((el.y / total) * 100).toFixed(1)
      res.push({ name: el.name, color: el.color, percent })
    })
    if (getMaxCountItems) {
      getMaxCountItems(res.length)
    }
    return res.sort((a, b) => b.percent - a.percent)
  }, [pieData])

  const wrapperClassNames = [showLegend ? 'with-legend' : 'only-chart', 'pdf-export']

  return (
    <StyledChart {...props}>
      <div
        style={{ height: '100%', backgroundColor: '#ffffff' }}
        className={wrapperClassNames.join(' ')}
        data-index={dataIndex}
      >
        <TitleChart>
          <div>{pieName}</div>
          <RemoveIcon setItem={setItem} />
        </TitleChart>
        {pieData && pieData.length ? (
          <>
            <HighchartsChart plotOptions={plotOptions}>
              <PieSeries name={pieName} data={pieData} size={200} />
              <XAxis min={0.01} />
            </HighchartsChart>
            {showLegend && (
              <Legends>
                {labels.map((el, index) => (
                  // eslint-disable-next-line react/no-array-index.js-key,react/no-array-index-key
                  <StyledLegend key={index}>
                    <Legend>
                      <Circle>
                        <circle cx='10' cy='10' r='8' style={{ fill: `${el.color}` }} />
                      </Circle>
                      <span>{el.name}</span>
                    </Legend>
                    <Legend>
                      <span>{el.percent}%</span>
                    </Legend>
                  </StyledLegend>
                ))}
              </Legends>
            )}{' '}
          </>
        ) : (
          <NoDataPlaceholder />
        )}
      </div>
    </StyledChart>
  )
}

AudiencePie.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pieData: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  pieName: PropTypes.string,
  setItem: PropTypes.func.isRequired,
  invisibleItems: PropTypes.arrayOf(PropTypes.string),
  widgetName: PropTypes.string.isRequired,
  getMaxCountItems: PropTypes.func,
  dataIndex: PropTypes.string,
  showLegend: PropTypes.bool
}

AudiencePie.defaultProps = {
  pieData: [],
  pieName: '',
  invisibleItems: [],
  getMaxCountItems: null,
  dataIndex: null,
  showLegend: true
}

export default withHighcharts(AudiencePie, Highcharts)
