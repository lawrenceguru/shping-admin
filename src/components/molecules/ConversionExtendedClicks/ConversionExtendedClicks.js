import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid4'
import intl from 'react-intl-universal'
import TopTable from '../../atoms/TopTable'
import { getCurrentPercent } from '../../../utils/calculations'
import { LineTwo, StyledIconPercents, StyledText, StyledPercents, ConversionClicksWrapper } from './styles'

const ConversionExtendedClicks = ({
  clicks,
  dataIndex,
  analyticsGetClicks,
  selectRange,
  setItem,
  setTableHeight,
  ...props
}) => {
  useEffect(() => {
    analyticsGetClicks()
  }, [])
  useEffect(() => {
    setTableHeight(clicks)
  }, [clicks])

  const getPercent = days => {
    if (days.length) {
      const currNumber = days[days.length - 1].num_visits
      const prevNumber = days.length > 1 ? days[days.length - 2].num_visits : null
      return getCurrentPercent(currNumber, prevNumber)
    }
    return 0
  }

  const dataColumns = useMemo(() => {
    const getDateByRange = range => {
      switch (range) {
        case 'get_days':
          return 'days'
        case 'get_weeks':
          return 'weeks'
        case 'get_months':
          return 'months'
        default:
          return 0
      }
    }
    const date = getDateByRange(selectRange)
    return [
      {
        dataIndex: date,
        key: date,
        render: (data, allData) => {
          const currPercents = getPercent(data)
          const isNaN = !Number.isFinite(currPercents) || Number.isNaN(currPercents)

          return (
            <LineTwo>
              {currPercents > 0 ? (
                <StyledIconPercents type='rise' style={{ color: '#50d166' }} />
              ) : (
                <StyledIconPercents type='fall' style={{ color: '#ff4a4b' }} />
              )}
              {/* eslint-disable-next-line no-nested-ternary */}
              <StyledText>{allData.text ? allData.text : allData.url ? allData.url : 'Unknown'}</StyledText>
              <StyledPercents style={currPercents > 0 ? { color: '#50d166' } : { color: '#ff4a4b' }}>
                {/* eslint-disable-next-line no-nested-ternary,react/no-unescaped-entities */}
                {isNaN || currPercents === 0
                  ? '0%'
                  : currPercents > 0
                  ? `+${Math.abs(currPercents)}%`
                  : `-${Math.abs(currPercents)}%`}
              </StyledPercents>
            </LineTwo>
          )
        }
      }
    ]
  }, [clicks])

  return (
    <ConversionClicksWrapper {...props}>
      <TopTable
        widgetName='ExtendedClicks'
        columns={dataColumns}
        dataIndex={dataIndex}
        columnsData={clicks && clicks.slice(0, 9)}
        rowKey={() => uuid()}
        headerText={intl.get('conversionPage.clicks')}
        isFooter={false}
        setItem={setItem}
      />
    </ConversionClicksWrapper>
  )
}

ConversionExtendedClicks.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  clicks: PropTypes.arrayOf(PropTypes.object),
  analyticsGetClicks: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  selectRange: PropTypes.string.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  dataIndex: PropTypes.string
}

ConversionExtendedClicks.defaultProps = {
  clicks: [],
  dataIndex: null
}
export default ConversionExtendedClicks
