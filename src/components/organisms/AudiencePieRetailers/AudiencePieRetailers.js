import React, { useEffect, useMemo } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import AudiencePie from '../../atoms/PieChart'
import { getDataForPieChart } from '../../../utils/analytics'

// eslint-disable-next-line no-unused-vars
const AudiencePieRetailers = ({
  retailers,
  analyticsGetRetailers,
  setItem,
  invisibleItems,
  getMaxCountItems,
  dataIndex,
  ...props
}) => {
  useEffect(() => {
    analyticsGetRetailers()
  }, [])

  const pieRetailers = useMemo(() => {
    return getDataForPieChart(retailers, 'shop')
  }, [retailers])

  return (
    !invisibleItems.includes('retailers') && (
      <AudiencePie
        pieName={intl.get('audiencePage.retailers')}
        widgetName='retailers'
        pieData={pieRetailers}
        dataIndex={dataIndex}
        setItem={() => setItem({ pageName: 'audiencePage', widgetName: 'retailers' })}
        invisibleItems={invisibleItems}
        getMaxCountItems={getMaxCountItems}
        showLegend={false}
        {...props}
      />
    )
  )
}

AudiencePieRetailers.propTypes = {
  retailers: PropTypes.arrayOf(PropTypes.object),
  analyticsGetRetailers: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  invisibleItems: PropTypes.arrayOf(PropTypes.string),
  getMaxCountItems: PropTypes.func.isRequired,
  dataIndex: PropTypes.string
}

AudiencePieRetailers.defaultProps = {
  retailers: [],
  invisibleItems: [],
  dataIndex: null
}
export default AudiencePieRetailers
